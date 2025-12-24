import { Module } from '@nestjs/common';
import { LayersController } from './layers.controller';
import { LayersService } from './layers.service';
import { LayersRepository } from './layers.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LayersController],
  providers: [LayersService, LayersRepository],
  exports: [LayersService, LayersRepository],
})
export class LayersModule {}