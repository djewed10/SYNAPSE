import { Injectable, Inject } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class ReportsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: any) {
    const [report] = await this.db.insert(schema.reports).values(data).returning();
    return report;
  }

  async findById(id: string) {
    const [report] = await this.db
      .select()
      .from(schema.reports)
      .where(eq(schema.reports.id, id))
      .limit(1);
    return report;
  }

  async findAll(limit: number, offset: number) {
    return this.db
      .select()
      .from(schema.reports)
      .limit(limit)
      .offset(offset)
      .orderBy(schema.reports.createdAt);
  }

  async findUnresolved(limit: number, offset: number) {
    return this.db
      .select()
      .from(schema.reports)
      .where(eq(schema.reports.isResolved, false))
      .limit(limit)
      .offset(offset)
      .orderBy(schema.reports.createdAt);
  }

  async count() {
    const [result] = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.reports);
    return result.count;
  }

  async countUnresolved() {
    const [result] = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.reports)
      .where(eq(schema.reports.isResolved, false));
    return result.count;
  }

  async update(id: string, data: any) {
    const [updated] = await this.db
      .update(schema.reports)
      .set(data)
      .where(eq(schema.reports.id, id))
      .returning();
    return updated;
  }
}