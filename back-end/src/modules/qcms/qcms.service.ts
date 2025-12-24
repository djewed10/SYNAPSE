import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { QcmsRepository } from './qcms.repository';
import { LayersService } from '../layers/layers.service';
import { ProgressRepository } from '../progress/progress.repository';
import { StatisticsProducer } from '../../queues/producers/statistics.producer';
import { CreateQcmDto } from './dto/create-qcm.dto';
import { UpdateQcmDto } from './dto/update-qcm.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { FilterQcmsDto } from './dto/filter-qcms.dto';

@Injectable()
export class QcmsService {
  constructor(
    private readonly qcmsRepository: QcmsRepository,
    private readonly layersService: LayersService,
    private readonly progressRepository: ProgressRepository,
    private readonly statisticsProducer: StatisticsProducer,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findAll(filterDto: FilterQcmsDto) {
    return this.qcmsRepository.findAll(filterDto);
  }

  async findById(id: string, userId?: string) {
    const qcm = await this.qcmsRepository.findById(id);
    if (!qcm) {
      throw new NotFoundException(`QCM with ID ${id} not found`);
    }

    if (userId) {
      const activeLayer = await this.layersService.getActiveLayer(userId);
      if (activeLayer) {
        const userAnswer = await this.progressRepository.getUserAnswer(
          userId,
          id,
          activeLayer.id,
        );
        return { ...qcm, userAnswer };
      }
    }

    return qcm;
  }

  async create(createDto: CreateQcmDto) {
    return this.qcmsRepository.create({
      ...createDto,
      isApproved: true,
    });
  }

  async update(id: string, updateDto: UpdateQcmDto) {
    await this.findById(id);
    return this.qcmsRepository.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.qcmsRepository.delete(id);
  }

  async submitAnswer(id: string, userId: string, submitAnswerDto: SubmitAnswerDto) {
    const qcm = await this.findById(id);
    const activeLayer = await this.layersService.getActiveLayer(userId);

    if (!activeLayer) {
      throw new BadRequestException('No active layer found. Please start a new layer.');
    }

    // Check if already answered in this layer
    const existingAnswer = await this.progressRepository.getUserAnswer(
      userId,
      id,
      activeLayer.id,
    );

    if (existingAnswer) {
      throw new BadRequestException('QCM already answered in this layer');
    }

    // Calculate correctness
    const { selectedAnswers } = submitAnswerDto;
    const correctAnswers = qcm.correctAnswers as string[];
    
    const correctCount = selectedAnswers.filter(ans => 
      correctAnswers.includes(ans)
    ).length;
    
    const incorrectCount = selectedAnswers.filter(ans => 
      !correctAnswers.includes(ans)
    ).length;

    let status: 'correct' | 'partial' | 'incorrect';
    let pointsEarned = 0;

    if (correctCount === correctAnswers.length && incorrectCount === 0) {
      status = 'correct';
      pointsEarned = 1;
    } else if (correctCount > 0 && incorrectCount === 0) {
      status = 'partial';
      pointsEarned = correctCount / correctAnswers.length;
    } else {
      status = 'incorrect';
      pointsEarned = 0;
    }

    // Save answer
    const answer = await this.progressRepository.createUserAnswer({
      userId,
      qcmId: id,
      layerId: activeLayer.id,
      selectedAnswers,
      status,
      pointsEarned,
    });

    // Queue statistics update
    await this.statisticsProducer.updateLayerStats(userId, activeLayer.id, qcm.lessonId);
    await this.statisticsProducer.updateUserPoints(userId, pointsEarned, new Date());

    // Emit event
    this.eventEmitter.emit('qcm.answered', {
      userId,
      qcmId: id,
      layerId: activeLayer.id,
      status,
      pointsEarned,
    });

    return {
      answer,
      status,
      pointsEarned,
      correctAnswers: correctAnswers,
      explanation: qcm.explanation,
    };
  }

  async submitUserQcm(userId: string, createDto: CreateQcmDto) {
    return this.qcmsRepository.create({
      ...createDto,
      submittedBy: userId,
      isApproved: false,
    });
  }
}