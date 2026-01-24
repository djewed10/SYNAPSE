import { Inject, Injectable } from '@nestjs/common';
import { desc, eq, } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class CommentsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: typeof schema.comments.$inferInsert) {
    const [comment] = await this.db
      .insert(schema.comments)
      .values(data)
      .returning();
    return comment;
  }

  async findById(id: string) {
    const [comment] = await this.db
      .select()
      .from(schema.comments)
      .where(eq(schema.comments.id, id))
      .limit(1);
    return comment;
  }

  async findByQcm(qcmId: string) {
    return this.db
      .select()
      .from(schema.comments)
      .where(eq(schema.comments.qcmId, qcmId))
      .orderBy(desc(schema.comments.createdAt));
  }

  async update(id: string, data: Partial<typeof schema.comments.$inferInsert>) {
    const [updated] = await this.db
      .update(schema.comments)
      .set({ ...data, updatedAt: new Date(), isEdited: true })
      .where(eq(schema.comments.id, id))
      .returning();
    return updated;
  }

  async delete(id: string) {
    await this.db.delete(schema.comments).where(eq(schema.comments.id, id));
  }

  async vote(userId: string, commentId: string, voteType: number) {
    await this.db
      .insert(schema.commentVotes)
      .values({ userId, commentId, voteType })
      .onConflictDoUpdate({
        target: [schema.commentVotes.userId, schema.commentVotes.commentId],
        set: { voteType, createdAt: new Date() },
      });

    // Update comment vote counts
    const votes = await this.db
      .select()
      .from(schema.commentVotes)
      .where(eq(schema.commentVotes.commentId, commentId));

    const upvotes = votes.filter(v => v.voteType === 1).length;
    const downvotes = votes.filter(v => v.voteType === -1).length;

    await this.db
      .update(schema.comments)
      .set({ upvotes, downvotes })
      .where(eq(schema.comments.id, commentId));
  }
}