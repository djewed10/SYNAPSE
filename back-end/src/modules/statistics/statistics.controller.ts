import { Controller, Get, Query, UseGuards, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Statistics')
@Controller('statistics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('general')
  @ApiOperation({ summary: 'Get general statistics over time' })
  async getGeneralStats(
    @CurrentUser() user: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.statisticsService.getGeneralStats(
      user.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('volet')
  @ApiOperation({ summary: 'Get volet-level statistics' })
  async getVoletStats(
    @CurrentUser() user: any,
    @Query('sourceFilter') sourceFilter?: string,
  ) {
    return this.statisticsService.getVoletStats(user.id, sourceFilter);
  }

  @Get('module/:moduleId')
  @ApiOperation({ summary: 'Get module statistics' })
  async getModuleStats(
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
    @CurrentUser() user: any,
    @Query('sourceFilter') sourceFilter?: string,
  ) {
    return this.statisticsService.getModuleStats(user.id, moduleId, sourceFilter);
  }

  @Get('lesson/:lessonId')
  @ApiOperation({ summary: 'Get lesson statistics' })
  async getLessonStats(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
    @CurrentUser() user: any,
    @Query('sourceFilter') sourceFilter?: string,
  ) {
    return this.statisticsService.getLessonStats(user.id, lessonId, sourceFilter);
  }

  @Get('qcm/:qcmId')
  @ApiOperation({ summary: 'Get QCM statistics and history' })
  async getQcmStats(
    @Param('qcmId', ParseUUIDPipe) qcmId: string,
    @CurrentUser() user: any,
  ) {
    return this.statisticsService.getQcmStats(user.id, qcmId);
  }

  @Get('layer/:layerId')
  @ApiOperation({ summary: 'Get layer statistics' })
  async getLayerStats(
    @Param('layerId', ParseUUIDPipe) layerId: string,
    @CurrentUser() user: any,
    @Query('sourceFilter') sourceFilter?: string,
  ) {
    return this.statisticsService.getLayerStats(user.id, layerId, sourceFilter);
  }
}