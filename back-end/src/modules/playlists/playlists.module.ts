import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { PlaylistsRepository } from './playlists.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, PlaylistsRepository],
  exports: [PlaylistsService],
})
export class PlaylistsModule {}