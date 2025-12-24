import { Module } from '@nestjs/common';
import { PlaylistQcmsController } from './playlist-qcms.controller';
import { PlaylistQcmsService } from './playlist-qcms.service';

@Module({
  controllers: [PlaylistQcmsController],
  providers: [PlaylistQcmsService]
})
export class PlaylistQcmsModule {}
