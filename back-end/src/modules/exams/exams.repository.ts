import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class ExamsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: any) {
    const [exam] = await this.db
      .insert(schema.customExams)
      .values(data)
      .returning();
    return exam;
  }

  async findById(id: string) {
    const [exam] = await this.db
      .select()
      .from(schema.customExams)
      .where(eq(schema.customExams.id, id))
      .limit(1);
    return exam;
  }

  async findByUser(userId: string) {
    return this.db
      .select()
      .from(schema.customExams)
      .where(eq(schema.customExams.userId, userId))
      .orderBy(schema.customExams.createdAt);
  }

  async update(id: string, data: any) {
    const [updated] = await this.db
      .update(schema.customExams)
      .set(data)
      .where(eq(schema.customExams.id, id))
      .returning();
    return updated;
  }

  async delete(id: string) {
    await this.db.delete(schema.customExams).where(eq(schema.customExams.id, id));
  }
}