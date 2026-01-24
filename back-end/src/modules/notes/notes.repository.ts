import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from '../../database/schema';

@Injectable()
export class NotesRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: typeof schema.notes.$inferInsert) {
    const [note] = await this.db.insert(schema.notes).values(data).returning();
    return note;
  }

  async findById(id: string) {
    const [note] = await this.db
      .select()
      .from(schema.notes)
      .where(eq(schema.notes.id, id))
      .limit(1);
    return note;
  }

  async findByUserAndQcm(userId: string, qcmId: string) {
    const [note] = await this.db
      .select()
      .from(schema.notes)
      .where(and(
        eq(schema.notes.userId, userId),
        eq(schema.notes.qcmId, qcmId),
      ))
      .limit(1);
    return note;
  }

  async findByUser(userId: string) {
    return this.db
      .select()
      .from(schema.notes)
      .where(eq(schema.notes.userId, userId))
      .orderBy(schema.notes.createdAt);
  }

  async update(id: string, data: Partial<typeof schema.notes.$inferInsert>) {
    const [updated] = await this.db
      .update(schema.notes)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.notes.id, id))
      .returning();
    return updated;
  }

  async delete(id: string) {
    await this.db.delete(schema.notes).where(eq(schema.notes.id, id));
  }
}