import { Injectable } from '@nestjs/common';
import { StatisticsRepository } from './statistics.repository';
import { CacheService } from '../../cache/cache.service';
import { LayersService } from '../layers/layers.service';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly statisticsRepository: StatisticsRepository,
    private readonly cacheService: CacheService,
    private readonly layersService: LayersService,
  ) {}

  async getGeneralStats(userId: string, startDate?: Date, endDate?: Date) {
    const cacheKey = `stats:general:${userId}:${startDate?.toISOString()}:${endDate?.toISOString()}`;
    
    return this.cacheService.wrap(
      cacheKey,
      async () => {
        return this.statisticsRepository.getGeneralStats(userId, startDate, endDate);
      },
      300000, // 5 minutes in milliseconds
    );
  }

  async getVoletStats(userId: string, sourceFilter?: string) {
    const activeLayer = await this.layersService.getActiveLayer(userId);
    if (!activeLayer) {
      return [];
    }

    const cacheKey = `stats:volet:${userId}:${activeLayer.id}:${sourceFilter || 'all'}`;
    
    return this.cacheService.wrap(
      cacheKey,
      async () => {
        return this.statisticsRepository.getVoletStats(userId, activeLayer.id, sourceFilter);
      },
      600000, // 10 minutes
    );
  }

  async getModuleStats(userId: string, moduleId: string, sourceFilter?: string) {
    const activeLayer = await this.layersService.getActiveLayer(userId);
    if (!activeLayer) {
      return null;
    }

    return this.statisticsRepository.getModuleStats(userId, moduleId, activeLayer.id, sourceFilter);
  }

  async getLessonStats(userId: string, lessonId: string, sourceFilter?: string) {
    const activeLayer = await this.layersService.getActiveLayer(userId);
    if (!activeLayer) {
      return null;
    }

    return this.statisticsRepository.getLessonStats(userId, lessonId, activeLayer.id, sourceFilter);
  }

  async getQcmStats(userId: string, qcmId: string) {
    return this.statisticsRepository.getQcmHistory(userId, qcmId);
  }

  async getLayerStats(userId: string, layerId: string, sourceFilter?: string) {
    return this.statisticsRepository.getLayerStats(userId, layerId, sourceFilter);
  }

  async updateLayerStatistics(userId: string, layerId: string, lessonId: string) {
    const stats = await this.statisticsRepository.calculateLayerStats(userId, layerId, lessonId);
    await this.statisticsRepository.upsertLayerStats(stats);
    
    await this.cacheService.del(`stats:layer:${userId}:${layerId}:*`);
  }
}