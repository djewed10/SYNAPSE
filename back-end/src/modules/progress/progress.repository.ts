import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class ProgressRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createUserAnswer(data: typeof schema.userAnswers.$inferInsert) {
    const [answer] = await this.db
      .insert(schema.userAnswers)
      .values(data)
      .returning();
    return answer;
  }

  async getUserAnswer(userId: string, qcmId: string, layerId: string) {
    const [answer] = await this.db
      .select()
      .from(schema.userAnswers)
      .where(and(
        eq(schema.userAnswers.userId, userId),
        eq(schema.userAnswers.qcmId, qcmId),
        eq(schema.userAnswers.layerId, layerId),
      ))
      .limit(1);
    return answer;
  }

  async getUserAnswersByLayer(userId: string, layerId: string) {
    return this.db
      .select()
      .from(schema.userAnswers)
      .where(and(
        eq(schema.userAnswers.userId, userId),
        eq(schema.userAnswers.layerId, layerId),
      ));
  }

  async trackActivity(data: typeof schema.userActivityHistory.$inferInsert) {
    const [activity] = await this.db
      .insert(schema.userActivityHistory)
      .values(data)
      .returning();
    return activity;
  }

  async getRecentLessons(userId: string, limit: number = 10) {
    return this.db
      .select()
      .from(schema.userActivityHistory)
      .where(and(
        eq(schema.userActivityHistory.userId, userId),
        eq(schema.userActivityHistory.activityType, 'lesson_visit'),
      ))
      .orderBy(desc(schema.userActivityHistory.timestamp))
      .limit(limit);
  }

  async getRecentModules(userId: string, limit: number = 5) {
    return this.db
      .select()
      .from(schema.userActivityHistory)
      .where(and(
        eq(schema.userActivityHistory.userId, userId),
        eq(schema.userActivityHistory.activityType, 'module_visit'),
      ))
      .orderBy(desc(schema.userActivityHistory.timestamp))
      .limit(limit);
  }
}