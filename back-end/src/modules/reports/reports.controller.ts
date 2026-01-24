import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateReportDto } from './dto/create-report.dto';
import { ResolveReportDto } from './dto/resolve-report.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createDto: CreateReportDto,
  ) {
    return this.reportsService.create(user.id, createDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.reportsService.findAll(paginationDto);
  }

  @Get('unresolved')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async findUnresolved(@Query() paginationDto: PaginationDto) {
    return this.reportsService.findUnresolved(paginationDto);
  }

  @Put(':id/resolve')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async resolve(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
    @Body() resolveDto: ResolveReportDto,
  ) {
    return this.reportsService.resolve(id, user.id, resolveDto);
  }
}