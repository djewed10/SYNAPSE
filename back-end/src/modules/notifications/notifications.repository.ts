import { Injectable, Inject } from '@nestjs/common';
import { eq, and, desc, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class NotificationsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: any) {
    const [notification] = await this.db
      .insert(schema.notifications)
      .values(data)
      .returning();
    return notification;
  }

  async findByUser(userId: string, limit: number, offset: number) {
    return this.db
      .select()
      .from(schema.notifications)
      .where(eq(schema.notifications.userId, userId))
      .orderBy(desc(schema.notifications.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async countByUser(userId: string) {
    const [result] = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.notifications)
      .where(eq(schema.notifications.userId, userId));
    return result.count;
  }

  async countUnread(userId: string) {
    const [result] = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.notifications)
      .where(and(
        eq(schema.notifications.userId, userId),
        eq(schema.notifications.isRead, false),
      ));
    return result.count;
  }

  async markAsRead(id: string, userId: string) {
    const [updated] = await this.db
      .update(schema.notifications)
      .set({ isRead: true })
      .where(and(
        eq(schema.notifications.id, id),
        eq(schema.notifications.userId, userId),
      ))
      .returning();
    return updated;
  }

  async markAllAsRead(userId: string) {
    await this.db
      .update(schema.notifications)
      .set({ isRead: true })
      .where(and(
        eq(schema.notifications.userId, userId),
        eq(schema.notifications.isRead, false),
      ));
  }
}