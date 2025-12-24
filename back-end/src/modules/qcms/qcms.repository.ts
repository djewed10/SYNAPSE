import { Inject, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../database/schema';
import type { FilterQcmsDto } from './dto/filter-qcms.dto';

@Injectable()
export class QcmsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly _db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: typeof schema.qcms.$inferInsert) {
    const [qcm] = await this.db.insert(schema.qcms).values(data).returning();
    return qcm;
  }

  async findById(id: string) {
    const [qcm] = await this.db
      .select()
      .from(schema.qcms)
      .where(eq(schema.qcms.id, id))
      .limit(1);
    return qcm;
  }

  async findAll(filterDto: FilterQcmsDto) {
    const { lessonId, source, isApproved } = filterDto;
    const conditions = [];

    if (lessonId) conditions.push(eq(schema.qcms.lessonId, lessonId));
    if (source) conditions.push(eq(schema.qcms.source, source));
    if (isApproved !== undefined) conditions.push(eq(schema.qcms.isApproved, isApproved));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    return this.db
      .select()
      .from(schema.qcms)
      .where(where)
      .orderBy(schema.qcms.order);
  }

  async update(id: string, data: Partial<typeof schema.qcms.$inferInsert>) {
    const [updated] = await this.db
      .update(schema.qcms)
      .set(data)
      .where(eq(schema.qcms.id, id))
      .returning();
    return updated;
  }

  async delete(id: string) {
    await this.db.delete(schema.qcms).where(eq(schema.qcms.id, id));
  }

  async count(lessonId?: string) {
    const where = lessonId ? eq(schema.qcms.lessonId, lessonId) : undefined;
    const [result] = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.qcms)
      .where(where);
    return result.count;
  }
}