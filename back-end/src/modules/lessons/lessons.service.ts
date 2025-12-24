import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { CacheService } from '../../cache/cache.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    private readonly lessonsRepository: LessonsRepository,
    private readonly cacheService: CacheService,
  ) {}

  async findAll() {
    return this.lessonsRepository.findAll();
  }

  async findByModule(moduleId: string) {
    const cacheKey = `lessons:module:${moduleId}`;
    return this.cacheService.wrap(
      cacheKey,
      async () => {
        return this.lessonsRepository.findByModule(moduleId);
      },
      3600 * 1000,
    );
  }

  async findById(id: string, userId?: string) {
    const lesson = await this.lessonsRepository.findById(id);
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async getLessonStats(id: string, userId: string, sourceFilter?: string) {
    // TODO: Calculate lesson statistics
    return {
      lessonId: id,
      userId,
      sourceFilter,
      totalQcms: 0,
      correctQcms: 0,
      partialQcms: 0,
      incorrectQcms: 0,
      remainingQcms: 0,
    };
  }

  async create(createDto: CreateLessonDto) {
    const lesson = await this.lessonsRepository.create(createDto);
    await this.cacheService.del(`lessons:module:${createDto.moduleId}`);
    return lesson;
  }

  async update(id: string, updateDto: UpdateLessonDto) {
    await this.findById(id);
    return this.lessonsRepository.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.lessonsRepository.delete(id);
  }
}