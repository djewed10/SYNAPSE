import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ActivationCodesService } from './activation-codes.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CreateActivationCodeDto } from './dto/create-activation-code.dto';
import { BulkCreateCodesDto } from './dto/bulk-create-codes.dto';
import { ValidateCodeDto } from './dto/validate-code.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Activation Codes')
@Controller('activation-codes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class ActivationCodesController {
  constructor(private readonly activationCodesService: ActivationCodesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a single activation code (Admin only)' })
  @ApiResponse({ status: 201, description: 'Activation code created successfully' })
  async create(@Body() createDto: CreateActivationCodeDto) {
    return this.activationCodesService.create(createDto);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Create multiple activation codes (Admin only)' })
  @ApiResponse({ status: 201, description: 'Activation codes created successfully' })
  async createBulk(@Body() bulkCreateDto: BulkCreateCodesDto) {
    return this.activationCodesService.createBulk(bulkCreateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activation codes (Admin only)' })
  @ApiResponse({ status: 200, description: 'Activation codes retrieved successfully' })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.activationCodesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get activation code by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Activation code retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Activation code not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.activationCodesService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate an activation code (Admin only)' })
  @ApiResponse({ status: 200, description: 'Activation code deactivated successfully' })
  async deactivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.activationCodesService.deactivate(id);
  }

  @Post('validate')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Validate an activation code' })
  @ApiResponse({ status: 200, description: 'Code is valid' })
  @ApiResponse({ status: 400, description: 'Code is invalid or expired' })
  async validate(@Body() validateDto: ValidateCodeDto) {
    return this.activationCodesService.validate(validateDto.code);
  }
}