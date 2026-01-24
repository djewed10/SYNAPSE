import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class ModulesRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: typeof schema.modules.$inferInsert) {
    const [module] = await this.db.insert(schema.modules).values(data).returning();
    return module;
  }

  async findById(id: string) {
    const [module] = await this.db
      .select()
      .from(schema.modules)
      .where(eq(schema.modules.id, id))
      .limit(1);
    return module;
  }

  async findAll() {
    return this.db.select().from(schema.modules).orderBy(schema.modules.order);
  }

  async findByVolet(voletId: string) {
    return this.db
      .select()
      .from(schema.modules)
      .where(eq(schema.modules.voletId, voletId))
      .orderBy(schema.modules.order);
  }

  async update(id: string, data: Partial<typeof schema.modules.$inferInsert>) {
    const [updated] = await this.db
      .update(schema.modules)
      .set(data)
      .where(eq(schema.modules.id, id))
      .returning();
    return updated;
  }

  async delete(id: string) {
    await this.db.delete(schema.modules).where(eq(schema.modules.id, id));
  }
}