import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { CacheModule } from './cache/cache.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ThrottleGuard } from './common/guards/throttle.guard';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { DatabaseModule } from './database/database.module';
import { ActivationCodesModule } from './modules/activation-codes/activation-codes.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ExamsModule } from './modules/exams/exams.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { NotesModule } from './modules/notes/notes.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ProgressController } from './modules/progress/progress.controller';
import { ProgressService } from './modules/progress/progress.service';
import { QcmsModule } from './modules/qcms/qcms.module';
import { ReportsModule } from './modules/reports/reports.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { TeamsModule } from './modules/teams/teams.module';
import { VoletsModule } from './modules/volets/volets.module';
import { QueuesModule } from './queues/queues.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UsersModule } from './modules/users/users.module';
import { ModulesModule } from './modules/modules/modules.module';
import { ProgressModule } from './modules/progress/progress.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { LayersModule } from './modules/layers/layers.module';
import { PlaylistsModule } from '@modules/playlists/playlists.module';
import { GamificationService } from './modules/gamification/gamification.service';
import { GamificationController } from './modules/gamification/gamification.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    DatabaseModule,
    CacheModule,
    QueuesModule,
    AuthModule,
    UsersModule,
    ActivationCodesModule,
    VoletsModule,
    ModulesModule,
    LessonsModule,
    QcmsModule,
    LayersModule,
    ProgressModule,
    StatisticsModule,
    PlaylistsModule,
    NotesModule,
    CommentsModule,
    ReportsModule,
    TeamsModule,
    NotificationsModule,
    GamificationModule,
    ExamsModule,
    UploadsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottleGuard,
    },
    ProgressService,
    GamificationService,
  ],
  controllers: [ProgressController, GamificationController],
})
export class AppModule {}