import { Injectable, Inject } from '@nestjs/common';
import { eq, and, gte, lte, sql, desc, SQL } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class StatisticsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async getGeneralStats(userId: string, startDate?: Date, endDate?: Date) {
    const conditions: any[] = [eq(schema.userAnswers.userId, userId)];
    
    if (startDate) conditions.push(gte(schema.userAnswers.answeredAt, startDate));
    if (endDate) conditions.push(lte(schema.userAnswers.answeredAt, endDate));

    const results = await this.db
      .select({
        date: sql<string>`DATE(${schema.userAnswers.answeredAt})`,
        total: sql<number>`COUNT(*)::int`,
        correct: sql<number>`COUNT(CASE WHEN ${schema.userAnswers.status} = 'correct' THEN 1 END)::int`,
        partial: sql<number>`COUNT(CASE WHEN ${schema.userAnswers.status} = 'partial' THEN 1 END)::int`,
        incorrect: sql<number>`COUNT(CASE WHEN ${schema.userAnswers.status} = 'incorrect' THEN 1 END)::int`,
      })
      .from(schema.userAnswers)
      .where(and(...conditions))
      .groupBy(sql`DATE(${schema.userAnswers.answeredAt})`)
      .orderBy(sql`DATE(${schema.userAnswers.answeredAt})`);

    return results;
  }

async getVoletStats(userId: string, layerId: string, sourceFilter?: string) {
  const conditions: SQL[] = [];

  if (sourceFilter) conditions.push(eq(schema.qcms.source, sourceFilter));

  const base = this.db
    .select({
      voletId: schema.volets.id,
      voletName: schema.volets.name,
      total: sql<number>`COUNT(DISTINCT ${schema.qcms.id})::int`,
      answered: sql<number>`COUNT(DISTINCT ${schema.userAnswers.qcmId})::int`,
      correct: sql<number>`COUNT(CASE WHEN ${schema.userAnswers.status} = 'correct' THEN 1 END)::int`,
      partial: sql<number>`COUNT(CASE WHEN ${schema.userAnswers.status} = 'partial' THEN 1 END)::int`,
      incorrect: sql<number>`COUNT(CASE WHEN ${schema.userAnswers.status} = 'incorrect' THEN 1 END)::int`,
    })
    .from(schema.volets)
    .leftJoin(schema.modules, eq(schema.volets.id, schema.modules.voletId))
    .leftJoin(schema.lessons, eq(schema.modules.id, schema.lessons.moduleId))
    .leftJoin(schema.qcms, eq(schema.lessons.id, schema.qcms.lessonId))
    .leftJoin(
      schema.userAnswers,
      and(
        eq(schema.qcms.id, schema.userAnswers.qcmId),
        eq(schema.userAnswers.userId, userId),
        eq(schema.userAnswers.layerId, layerId),
      ),
    );

  const query = conditions.length ? base.where(and(...conditions)) : base;

  return query
    .groupBy(schema.volets.id, schema.volets.name)
    .orderBy(schema.volets.order);
}

  async getModuleStats(userId: string, moduleId: string, layerId: string, sourceFilter?: string) {
    const conditions: any[] = [
      eq(schema.lessons.moduleId, moduleId),
      eq(schema.userAnswers.userId, userId),
      eq(schema.userAnswers.layerId, layerId),
    ];

    if (sourceFilter) {
      conditions.push(eq(schema.qcms.source, sourceFilter));
    }

    const [result] = await this.db
      .select({
        moduleId: schema.modules.id,
        moduleName: schema.modules.name,
        total: sql<number>`COUNT(DISTINCT ${schema.qcms.id})::int`,
        answered: sql<number>`COUNT(DISTINCT ${schema.userAnswers.qcmId})::int`,
        correct: sql<number>`SUM(CASE WHEN ${schema.userAnswers.status} = 'correct' THEN 1 ELSE 0 END)::int`,
        partial: sql<number>`SUM(CASE WHEN ${schema.userAnswers.status} = 'partial' THEN 1 ELSE 0 END)::int`,
        incorrect: sql<number>`SUM(CASE WHEN ${schema.userAnswers.status} = 'incorrect' THEN 1 ELSE 0 END)::int`,
      })
      .from(schema.modules)
      .leftJoin(schema.lessons, eq(schema.modules.id, schema.lessons.moduleId))
      .leftJoin(schema.qcms, eq(schema.lessons.id, schema.qcms.lessonId))
      .leftJoin(schema.userAnswers, and(
        eq(schema.qcms.id, schema.userAnswers.qcmId),
        ...conditions,
      ))
      .where(eq(schema.modules.id, moduleId))
      .groupBy(schema.modules.id, schema.modules.name);

    return result;
  }

  async getLessonStats(userId: string, lessonId: string, layerId: string, sourceFilter?: string) {
    const conditions: any[] = [
      eq(schema.qcms.lessonId, lessonId),
      eq(schema.userAnswers.userId, userId),
      eq(schema.userAnswers.layerId, layerId),
    ];

    if (sourceFilter) {
      conditions.push(eq(schema.qcms.source, sourceFilter));
    }

    const [result] = await this.db
      .select({
        lessonId: schema.lessons.id,
        lessonName: schema.lessons.name,
        total: sql<number>`COUNT(DISTINCT ${schema.qcms.id})::int`,
        answered: sql<number>`COUNT(DISTINCT ${schema.userAnswers.qcmId})::int`,
        correct: sql<number>`SUM(CASE WHEN ${schema.userAnswers.status} = 'correct' THEN 1 ELSE 0 END)::int`,
        partial: sql<number>`SUM(CASE WHEN ${schema.userAnswers.status} = 'partial' THEN 1 ELSE 0 END)::int`,
        incorrect: sql<number>`SUM(CASE WHEN ${schema.userAnswers.status} = 'incorrect' THEN 1 ELSE 0 END)::int`,
      })
      .from(schema.lessons)
      .leftJoin(schema.qcms, eq(schema.lessons.id, schema.qcms.lessonId))
      .leftJoin(schema.userAnswers, and(...conditions))
      .where(eq(schema.lessons.id, lessonId))
      .groupBy(schema.lessons.id, schema.lessons.name);

    return result;
  }

  async getQcmHistory(userId: string, qcmId: string) {
    return this.db
      .select({
        layerId: schema.layers.id,
        layerNumber: schema.layers.layerNumber,
        selectedAnswers: schema.userAnswers.selectedAnswers,
        status: schema.userAnswers.status,
        pointsEarned: schema.userAnswers.pointsEarned,
        answeredAt: schema.userAnswers.answeredAt,
      })
      .from(schema.userAnswers)
      .leftJoin(schema.layers, eq(schema.userAnswers.layerId, schema.layers.id))
      .where(and(
        eq(schema.userAnswers.userId, userId),
        eq(schema.userAnswers.qcmId, qcmId),
      ))
      .orderBy(desc(schema.userAnswers.answeredAt));
  }

  async getLayerStats(userId: string, layerId: string, sourceFilter?: string) {
    return this.db
      .select()
      .from(schema.userAnswers)
      .where(and(
        eq(schema.userAnswers.userId, userId),
        eq(schema.userAnswers.layerId, layerId),
      ));
  }

  async calculateLayerStats(userId: string, layerId: string, lessonId: string) {
    const [stats] = await this.db
      .select({
        correctCount: sql<number>`COUNT(CASE WHEN ${schema.userAnswers.status} = 'correct' THEN 1 END)::int`,
        partialCount: sql<number>`COUNT(CASE WHEN ${schema.userAnswers.status} = 'partial' THEN 1 END)::int`,
        incorrectCount: sql<number>`COUNT(CASE WHEN ${schema.userAnswers.status} = 'incorrect' THEN 1 END)::int`,
        totalAnswered: sql<number>`COUNT(*)::int`,
      })
      .from(schema.userAnswers)
      .leftJoin(schema.qcms, eq(schema.userAnswers.qcmId, schema.qcms.id))
      .where(and(
        eq(schema.userAnswers.userId, userId),
        eq(schema.userAnswers.layerId, layerId),
        eq(schema.qcms.lessonId, lessonId),
      ));

    return {
      userId,
      layerId,
      lessonId,
      ...stats,
    };
  }

  async upsertLayerStats(stats: any) {
    await this.db
      .insert(schema.userAnswers)
      .values({
        userId: stats.userId,
        layerId: stats.layerId,
        qcmId: '00000000-0000-0000-0000-000000000000',
        selectedAnswers: [],
        status: 'correct',
        pointsEarned: 0,
        answeredAt: new Date(),
      })
     
  }
}