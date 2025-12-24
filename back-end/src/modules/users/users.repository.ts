import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../database/schema';
import { DATABASE_CONNECTION } from '../../database/database-connection';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(DATABASE_CONNECTION) 
    private readonly _db: NodePgDatabase<typeof schema>,
  ) {}

  async create(userData: typeof schema.users.$inferInsert) {
    const [user] = await this.db
      .insert(schema.users)
      .values(userData)
      .returning();
    return user;
  }

  async findById(id: string) {
    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);
    return user;
  }

  async findByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    return user;
  }

  async findAll(limit: number, offset: number) {
    return this.db
      .select()
      .from(schema.users)
      .limit(limit)
      .offset(offset)
      .orderBy(schema.users.createdAt);
  }

  async count() {
    const [result] = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.users);
    return result.count;
  }

  async update(id: string, userData: Partial<typeof schema.users.$inferInsert>) {
    const [updatedUser] = await this.db
      .update(schema.users)
      .set(userData)
      .where(eq(schema.users.id, id))
      .returning();
    return updatedUser;
  }

  async delete(id: string) {
    await this.db
      .delete(schema.users)
      .where(eq(schema.users.id, id));
  }

  async updateLastActive(id: string) {
    return this.update(id, { updatedAt: new Date() });
  }
}