import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class LessonsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: typeof schema.lessons.$inferInsert) {
    const [lesson] = await this.db.insert(schema.lessons).values(data).returning();
    return lesson;
  }

  async findById(id: string) {
    const [lesson] = await this.db
      .select()
      .from(schema.lessons)
      .where(eq(schema.lessons.id, id))
      .limit(1);
    return lesson;
  }

  async findAll() {
    return this.db.select().from(schema.lessons).orderBy(schema.lessons.order);
  }

  async findByModule(moduleId: string) {
    return this.db
      .select()
      .from(schema.lessons)
      .where(eq(schema.lessons.moduleId, moduleId))
      .orderBy(schema.lessons.order);
  }

  async update(id: string, data: Partial<typeof schema.lessons.$inferInsert>) {
    const [updated] = await this.db
      .update(schema.lessons)
      .set(data)
      .where(eq(schema.lessons.id, id))
      .returning();
    return updated;
  }

  async delete(id: string) {
    await this.db.delete(schema.lessons).where(eq(schema.lessons.id, id));
  }
}