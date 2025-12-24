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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ModulesService } from './modules.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@ApiTags('Modules')
@Controller('modules')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all modules' })
  async findAll(@Query('voletId') voletId?: string) {
    if (voletId) {
      return this.modulesService.findByVolet(voletId);
    }
    return this.modulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get module by ID' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
  ) {
    return this.modulesService.findById(id, user.id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get module statistics for current user' })
  async getStats(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
    @Query('sourceFilter') sourceFilter?: string,
  ) {
    return this.modulesService.getModuleStats(id, user.id, sourceFilter);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create module (Admin only)' })
  async create(@Body() createDto: CreateModuleDto) {
    return this.modulesService.create(createDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update module (Admin only)' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateModuleDto,
  ) {
    return this.modulesService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete module (Admin only)' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.modulesService.remove(id);
  }
}