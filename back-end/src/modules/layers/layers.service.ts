import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { LayersRepository } from './layers.repository';

@Injectable()
export class LayersService {
  constructor(private readonly layersRepository: LayersRepository) {}

  async getActiveLayer(userId: string) {
    return this.layersRepository.findActiveLayer(userId);
  }

  async getOrCreateActiveLayer(userId: string) {
    let activeLayer = await this.layersRepository.findActiveLayer(userId);
    
    if (!activeLayer) {
      const highestLayer = await this.layersRepository.findHighestLayerNumber(userId);
      activeLayer = await this.layersRepository.create({
        userId,
        layerNumber: (highestLayer?.layerNumber || 0) + 1,
        isActive: true,
      });
    }
    
    return activeLayer;
  }

  async startNewLayer(userId: string) {
    const currentLayer = await this.layersRepository.findActiveLayer(userId);
    
    if (currentLayer) {
      await this.layersRepository.update(currentLayer.id, {
        isActive: false,
        completedAt: new Date(),
      });
    }
    
    const highestLayer = await this.layersRepository.findHighestLayerNumber(userId);
    const newLayer = await this.layersRepository.create({
      userId,
      layerNumber: (highestLayer?.layerNumber || 0) + 1,
      isActive: true,
    });
    
    return newLayer;
  }

  async getLayerHistory(userId: string) {
    return this.layersRepository.findByUser(userId);
  }

  async getLayerSummary(layerId: string, userId: string) {
    const layer = await this.layersRepository.findById(layerId);
    
    if (!layer || layer.userId !== userId) {
      throw new NotFoundException('Layer not found');
    }
    
    // TODO: Get statistics for this layer
    return {
      layer,
      stats: {
        totalAnswered: 0,
        correct: 0,
        partial: 0,
        incorrect: 0,
      },
    };
  }
}