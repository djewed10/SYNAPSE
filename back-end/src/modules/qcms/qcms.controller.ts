import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { QcmsService } from './qcms.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateQcmDto } from './dto/create-qcm.dto';
import { UpdateQcmDto } from './dto/update-qcm.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { FilterQcmsDto } from './dto/filter-qcms.dto';

@ApiTags('QCMs')
@Controller('qcms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QcmsController {
  constructor(private readonly qcmsService: QcmsService) {}

  @Get()
  async findAll(@Query() filterDto: FilterQcmsDto) {
    return this.qcmsService.findAll(filterDto);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
  ) {
    return this.qcmsService.findById(id, user.id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() createDto: CreateQcmDto) {
    return this.qcmsService.create(createDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateQcmDto,
  ) {
    return this.qcmsService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.qcmsService.remove(id);
  }

  @Post(':id/answer')
  async submitAnswer(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
    @Body() submitAnswerDto: SubmitAnswerDto,
  ) {
    return this.qcmsService.submitAnswer(id, user.id, submitAnswerDto);
  }

  @Post('submit')
  async submitQcm(
    @CurrentUser() user: any,
    @Body() submitDto: CreateQcmDto,
  ) {
    return this.qcmsService.submitUserQcm(user.id, submitDto);
  }
}