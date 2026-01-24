import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class LayersRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: typeof schema.layers.$inferInsert) {
    const [layer] = await this.db.insert(schema.layers).values(data).returning();
    return layer;
  }

  async findById(id: string) {
    const [layer] = await this.db
      .select()
      .from(schema.layers)
      .where(eq(schema.layers.id, id))
      .limit(1);
    return layer;
  }

  async findActiveLayer(userId: string) {
    const [layer] = await this.db
      .select()
      .from(schema.layers)
      .where(and(
        eq(schema.layers.userId, userId),
        eq(schema.layers.isActive, true),
      ))
      .limit(1);
    return layer;
  }

  async findHighestLayerNumber(userId: string) {
    const [layer] = await this.db
      .select()
      .from(schema.layers)
      .where(eq(schema.layers.userId, userId))
      .orderBy(desc(schema.layers.layerNumber))
      .limit(1);
    return layer;
  }

  async findByUser(userId: string) {
    return this.db
      .select()
      .from(schema.layers)
      .where(eq(schema.layers.userId, userId))
      .orderBy(desc(schema.layers.layerNumber));
  }

  async update(id: string, data: Partial<typeof schema.layers.$inferInsert>) {
    const [updated] = await this.db
      .update(schema.layers)
      .set(data)
      .where(eq(schema.layers.id, id))
      .returning();
    return updated;
  }
}