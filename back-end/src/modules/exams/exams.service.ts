import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ExamsRepository } from './exams.repository';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(private readonly examsRepository: ExamsRepository) {}

  async create(userId: string, createDto: CreateExamDto) {
    return this.examsRepository.create({
      ...createDto,
      userId,
    });
  }

  async findByUser(userId: string) {
    return this.examsRepository.findByUser(userId);
  }

  async findById(id: string, userId: string) {
    const exam = await this.examsRepository.findById(id);
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    if (exam.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return exam;
  }

  async update(id: string, userId: string, updateDto: UpdateExamDto) {
    await this.findById(id, userId);
    return this.examsRepository.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string, userId: string) {
    await this.findById(id, userId);
    await this.examsRepository.delete(id);
  }
}