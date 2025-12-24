import { Injectable, NotFoundException } from '@nestjs/common';
import { ModulesRepository } from './modules.repository';
import { CacheService } from '../../cache/cache.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    private readonly modulesRepository: ModulesRepository,
    private readonly cacheService: CacheService,
  ) {}

  async findAll() {
    return this.modulesRepository.findAll();
  }

  async findByVolet(voletId: string) {
    const cacheKey = `modules:volet:${voletId}`;
    return this.cacheService.wrap(
      cacheKey,
      async () => {
        return this.modulesRepository.findByVolet(voletId);
      },
      3600 * 1000,
    );
  }

  async findById(id: string, userId?: string) {
    const module = await this.modulesRepository.findById(id);
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    if (userId) {
      // TODO: Get user's progress for this module
    }

    return module;
  }

  async getModuleStats(id: string, userId: string, sourceFilter?: string) {
    // TODO: Calculate module statistics for user
    return {
      moduleId: id,
      userId,
      sourceFilter,
      totalQcms: 0,
      answeredQcms: 0,
      correctQcms: 0,
      partialQcms: 0,
      incorrectQcms: 0,
    };
  }

  async create(createDto: CreateModuleDto) {
    const module = await this.modulesRepository.create(createDto);
    await this.cacheService.del(`modules:volet:${createDto.voletId}`);
    return module;
  }

  async update(id: string, updateDto: UpdateModuleDto) {
    await this.findById(id);
    const updated = await this.modulesRepository.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
    return updated;
  }

  async remove(id: string) {
    await this.findById(id);
    await this.modulesRepository.delete(id);
  }
}