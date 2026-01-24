import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../../database/database-connection';
import * as schema from '../../database/schema';

@Injectable()
export class ActivationCodesRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: typeof schema.activationCodes.$inferInsert) {
    const [code] = await this.db
      .insert(schema.activationCodes)
      .values(data)
      .returning();
    return code;
  }

  async createMany(data: typeof schema.activationCodes.$inferInsert[]) {
    return this.db
      .insert(schema.activationCodes)
      .values(data)
      .returning();
  }

  async findById(id: string) {
    const [code] = await this.db
      .select()
      .from(schema.activationCodes)
      .where(eq(schema.activationCodes.id, id))
      .limit(1);
    return code;
  }

  async findByCode(code: string) {
    const [result] = await this.db
      .select()
      .from(schema.activationCodes)
      .where(eq(schema.activationCodes.code, code))
      .limit(1);
    return result;
  }

  async findAll(limit: number, offset: number) {
    return this.db
      .select()
      .from(schema.activationCodes)
      .limit(limit)
      .offset(offset)
      .orderBy(schema.activationCodes.createdAt);
  }

  async count() {
    const [result] = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.activationCodes);
    return result.count;
  }

  async update(id: string, data: Partial<typeof schema.activationCodes.$inferInsert>) {
    const [updated] = await this.db
      .update(schema.activationCodes)
      .set(data)
      .where(eq(schema.activationCodes.id, id))
      .returning();
    return updated;
  }

  async markAsUsed(id: string, userEmail: string) {
    return this.update(id, {
      usedBy: userEmail,
      usedAt: new Date(),
    });
  }
}