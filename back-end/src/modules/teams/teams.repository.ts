import { Injectable, Inject } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class TeamsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: any) {
    const [team] = await this.db.insert(schema.teams).values(data).returning();
    return team;
  }

  async findById(id: string) {
    const [team] = await this.db
      .select()
      .from(schema.teams)
      .where(eq(schema.teams.id, id))
      .limit(1);
    return team;
  }

  async findByUser(userId: string) {
    return this.db
      .select({
        team: schema.teams,
        role: schema.teamMembers.role,
        joinedAt: schema.teamMembers.joinedAt,
      })
      .from(schema.teamMembers)
      .leftJoin(schema.teams, eq(schema.teamMembers.teamId, schema.teams.id))
      .where(eq(schema.teamMembers.userId, userId));
  }

  async update(id: string, data: any) {
    const [updated] = await this.db
      .update(schema.teams)
      .set(data)
      .where(eq(schema.teams.id, id))
      .returning();
    return updated;
  }

  async delete(id: string) {
    await this.db.delete(schema.teams).where(eq(schema.teams.id, id));
  }

  async addMember(teamId: string, userId: string, role: string) {
    await this.db
      .insert(schema.teamMembers)
      .values({ teamId, userId, role });
  }

  async removeMember(teamId: string, userId: string) {
    await this.db
      .delete(schema.teamMembers)
      .where(and(
        eq(schema.teamMembers.teamId, teamId),
        eq(schema.teamMembers.userId, userId),
      ));
  }

  async isMember(teamId: string, userId: string): Promise<boolean> {
    const [member] = await this.db
      .select()
      .from(schema.teamMembers)
      .where(and(
        eq(schema.teamMembers.teamId, teamId),
        eq(schema.teamMembers.userId, userId),
      ))
      .limit(1);
    return !!member;
  }

  async isAdmin(teamId: string, userId: string): Promise<boolean> {
    const [member] = await this.db
      .select()
      .from(schema.teamMembers)
      .where(and(
        eq(schema.teamMembers.teamId, teamId),
        eq(schema.teamMembers.userId, userId),
        eq(schema.teamMembers.role, 'admin'),
      ))
      .limit(1);
    return !!member;
  }

  async shareContent(data: any) {
    const [shared] = await this.db
      .insert(schema.teamSharedContent)
      .values(data)
      .returning();
    return shared;
  }

  async getSharedContent(teamId: string) {
    return this.db
      .select()
      .from(schema.teamSharedContent)
      .where(eq(schema.teamSharedContent.teamId, teamId))
      .orderBy(schema.teamSharedContent.sharedAt);
  }
}