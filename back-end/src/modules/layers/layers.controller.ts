import { Controller, Get, Post, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LayersService } from './layers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Layers')
@Controller('layers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LayersController {
  constructor(private readonly layersService: LayersService) {}

  @Get('active')
  async getActiveLayer(@CurrentUser() user: any) {
    return this.layersService.getOrCreateActiveLayer(user.id);
  }

  @Post('new')
  async startNewLayer(@CurrentUser() user: any) {
    return this.layersService.startNewLayer(user.id);
  }

  @Get('history')
  async getHistory(@CurrentUser() user: any) {
    return this.layersService.getLayerHistory(user.id);
  }

  @Get(':id/summary')
  async getLayerSummary(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
  ) {
    return this.layersService.getLayerSummary(id, user.id);
  }
}