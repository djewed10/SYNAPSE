import { Inject, Injectable } from '@nestjs/common';
import { and, eq, } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { DATABASE_CONNECTION } from 'src/database/database-connection';

@Injectable()
export class PlaylistsRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: typeof schema.playlists.$inferInsert) {
    const [playlist] = await this.db
      .insert(schema.playlists)
      .values(data)
      .returning();
    return playlist;
  }

  async findById(id: string) {
    const [playlist] = await this.db
      .select()
      .from(schema.playlists)
      .where(eq(schema.playlists.id, id))
      .limit(1);
    return playlist;
  }

  async findByUser(userId: string) {
    return this.db
      .select()
      .from(schema.playlists)
      .where(eq(schema.playlists.userId, userId))
      .orderBy(schema.playlists.createdAt);
  }

  async addQcm(playlistId: string, qcmId: string) {
    await this.db
      .insert(schema.playlistQcms)
      .values({ playlistId, qcmId });
  }

  async removeQcm(playlistId: string, qcmId: string) {
    await this.db
      .delete(schema.playlistQcms)
      .where(and(
        eq(schema.playlistQcms.playlistId, playlistId),
        eq(schema.playlistQcms.qcmId, qcmId),
      ));
  }

  async getPlaylistQcms(playlistId: string) {
    return this.db
      .select({
        qcm: schema.qcms,
        addedAt: schema.playlistQcms.addedAt,
      })
      .from(schema.playlistQcms)
      .leftJoin(schema.qcms, eq(schema.playlistQcms.qcmId, schema.qcms.id))
      .where(eq(schema.playlistQcms.playlistId, playlistId));
  }
}