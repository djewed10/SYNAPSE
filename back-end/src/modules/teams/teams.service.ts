import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TeamsRepository } from './teams.repository';
import { NotificationsProducer } from '../../queues/producers/notifications.producer';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { ShareContentDto } from './dto/share-content.dto';

@Injectable()
export class TeamsService {
  constructor(
    private readonly teamsRepository: TeamsRepository,
    private readonly notificationsProducer: NotificationsProducer,
  ) {}

  async create(userId: string, createDto: CreateTeamDto) {
    const team = await this.teamsRepository.create({
      ...createDto,
      createdBy: userId,
    });
    
    await this.teamsRepository.addMember(team.id, userId, 'admin');
    return team;
  }

  async findById(id: string) {
    const team = await this.teamsRepository.findById(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async getUserTeams(userId: string) {
    return this.teamsRepository.findByUser(userId);
  }

  async update(id: string, userId: string, updateDto: UpdateTeamDto) {
    const team = await this.findById(id);

    const isAdmin = await this.teamsRepository.isAdmin(id, userId);
    if (!isAdmin) {
      throw new ForbiddenException('Only team admins can update the team');
    }

    return this.teamsRepository.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string, userId: string) {
    const team = await this.findById(id);

    if (team.createdBy !== userId) {
      throw new ForbiddenException('Only team creator can delete the team');
    }

    await this.teamsRepository.delete(id);
  }

  async inviteMember(id: string, inviterId: string, inviteDto: InviteMemberDto) {
    const team = await this.findById(id);
    const isAdmin = await this.teamsRepository.isAdmin(id, inviterId);
    if (!isAdmin) {
      throw new ForbiddenException('Only team admins can invite members');
    }

    await this.teamsRepository.addMember(id, inviteDto.userId, 'member');

    await this.notificationsProducer.sendNotification(
      inviteDto.userId,
      'TEAM_INVITATION',
      { teamId: id, teamName: team.name, inviterId },
    );

    return { message: 'Member invited successfully' };
  }

  async removeMember(teamId: string, userId: string, requesterId: string) {
    const team = await this.findById(teamId);
    const isAdmin = await this.teamsRepository.isAdmin(teamId, requesterId);
    if (!isAdmin && requesterId !== userId) {
      throw new ForbiddenException('Only team admins can remove members');
    }

    if (team.createdBy === userId) {
      throw new ForbiddenException('Cannot remove team creator');
    }

    await this.teamsRepository.removeMember(teamId, userId);
  }

  async shareContent(teamId: string, userId: string, shareDto: ShareContentDto) {
    await this.findById(teamId);
    const isMember = await this.teamsRepository.isMember(teamId, userId);
    if (!isMember) {
      throw new ForbiddenException('Only team members can share content');
    }

    return this.teamsRepository.shareContent({
      teamId,
      userId,
      contentType: shareDto.contentType,
      contentId: shareDto.contentId,
    });
  }

  async getSharedContent(teamId: string) {
    return this.teamsRepository.getSharedContent(teamId);
  }
}