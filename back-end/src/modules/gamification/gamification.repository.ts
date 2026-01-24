import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq, gte, lte, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from '../../database/schema';

@Injectable()
export class GamificationRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async upsertDailyPoints(
    userId: string,
    date: Date,
    points: number,
    questionsAnswered: number,
    correctAnswers: number,
  ) {
    const dateOnly = new Date(date.toDateString());

    await this.db
      .insert(schema.userPoints)
      .values({
        userId,
        date: dateOnly,
        totalPoints: points,
        questionsAnswered,
        correctAnswers,
        rankingPoints: this.calculateRankingPoints(points, questionsAnswered),
      })
      .onConflictDoUpdate({
        target: [schema.userPoints.userId, schema.userPoints.date],
        set: {
          totalPoints: sql`${schema.userPoints.totalPoints} + ${points}`,
          questionsAnswered: sql`${schema.userPoints.questionsAnswered} + ${questionsAnswered}`,
          correctAnswers: sql`${schema.userPoints.correctAnswers} + ${correctAnswers}`,
          rankingPoints: sql`((${schema.userPoints.totalPoints} + ${points}) / (${schema.userPoints.questionsAnswered} + ${questionsAnswered})) * (${schema.userPoints.totalPoints} + ${points}) + ((${schema.userPoints.questionsAnswered} + ${questionsAnswered}) * 0.02)`,
        },
      });
  }

  async getDailyRanking(date: Date, limit: number = 50) {
    const dateOnly = new Date(date.toDateString());

    return this.db
      .select({
        userId: schema.userPoints.userId,
        userName: schema.users.name,
        totalPoints: schema.userPoints.totalPoints,
        questionsAnswered: schema.userPoints.questionsAnswered,
        rankingPoints: schema.userPoints.rankingPoints,
      })
      .from(schema.userPoints)
      .leftJoin(schema.users, eq(schema.userPoints.userId, schema.users.id))
      .where(and(
        eq(schema.userPoints.date, dateOnly),
        eq(schema.users.competitiveModeEnabled, true),
      ))
      .orderBy(desc(schema.userPoints.rankingPoints))
      .limit(limit);
  }

  async getWeeklyRanking(startDate: Date, endDate: Date, limit: number = 50) {
    return this.db
      .select({
        userId: schema.userPoints.userId,
        userName: schema.users.name,
        totalPoints: sql<number>`SUM(${schema.userPoints.totalPoints})::int`,
        questionsAnswered: sql<number>`SUM(${schema.userPoints.questionsAnswered})::int`,
        rankingPoints: sql<number>`SUM(${schema.userPoints.rankingPoints})::real`,
      })
      .from(schema.userPoints)
      .leftJoin(schema.users, eq(schema.userPoints.userId, schema.users.id))
      .where(and(
        gte(schema.userPoints.date, startDate),
        lte(schema.userPoints.date, endDate),
        eq(schema.users.competitiveModeEnabled, true),
      ))
      .groupBy(schema.userPoints.userId, schema.users.name)
      .orderBy(desc(sql`SUM(${schema.userPoints.rankingPoints})`))
      .limit(limit);
  }

  private calculateRankingPoints(points: number, questionsAnswered: number): number {
    if (questionsAnswered === 0) return 0;
    return (points / questionsAnswered) * points + (questionsAnswered * 0.02);
  }
}