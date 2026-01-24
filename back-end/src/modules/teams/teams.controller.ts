import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { ShareContentDto } from './dto/share-content.dto';

@ApiTags('Teams')
@Controller('teams')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createDto: CreateTeamDto,
  ) {
    return this.teamsService.create(user.id, createDto);
  }

  @Get('my-teams')
  async getMyTeams(@CurrentUser() user: any) {
    return this.teamsService.getUserTeams(user.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
    @Body() updateDto: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, user.id, updateDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
  ) {
    return this.teamsService.remove(id, user.id);
  }

  @Post(':id/invite')
  async inviteMember(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
    @Body() inviteDto: InviteMemberDto,
  ) {
    return this.teamsService.inviteMember(id, user.id, inviteDto);
  }

  @Delete(':id/members/:userId')
  async removeMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @CurrentUser() user: any,
  ) {
    return this.teamsService.removeMember(id, userId, user.id);
  }

  @Post(':id/share')
  async shareContent(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
    @Body() shareDto: ShareContentDto,
  ) {
    return this.teamsService.shareContent(id, user.id, shareDto);
  }

  @Get(':id/shared-content')
  async getSharedContent(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.getSharedContent(id);
  }
}