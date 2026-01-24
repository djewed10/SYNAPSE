import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsGateway } from './gateway/notifications.gateway';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async create(userId: string, type: string, message: string, data?: any) {
    const notification = await this.notificationsRepository.create({
      userId,
      type: type as any,
      message,
      targetType: data?.targetType,
      targetId: data?.targetId,
      actorId: data?.actorId,
      isRead: false,
    });

    this.notificationsGateway.sendToUser(userId, 'notification', notification);

    return notification;
  }

  async findByUser(userId: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 20 } = paginationDto;
    const offset = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      this.notificationsRepository.findByUser(userId, limit, offset),
      this.notificationsRepository.countByUser(userId),
    ]);

    return {
      data: notifications,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(id: string, userId: string) {
    return this.notificationsRepository.markAsRead(id, userId);
  }

  async markAllAsRead(userId: string) {
    return this.notificationsRepository.markAllAsRead(userId);
  }

  async getUnreadCount(userId: string) {
    return this.notificationsRepository.countUnread(userId);
  }
}