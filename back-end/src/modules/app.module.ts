import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { DatabaseModule } from "../database/database.module"
import { ActivationCodesModule } from "./activation-codes/activation-codes.module"
import { AdminModule } from "./admin/admin.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { CommentVotesModule } from "./comment-votes/comment-votes.module"
import { CommentsModule } from "./comments/comments.module"
import { CustomExamsModule } from "./custom-exams/custom-exams.module"
import { LayerStatisticsModule } from "./layer-statistics/layer-statistics.module"
import { LayersModule } from "./layers/layers.module"
import { LessonsModule } from "./lessons/lessons.module"
import { ModulesController } from "./modules/modules.controller"
import { ModulesModule } from "./modules/modules.module"
import { ModulesService } from "./modules/modules.service"
import { NotesModule } from "./notes/notes.module"
import { NotificationsModule } from "./notifications/notifications.module"
import { PlaylistQcmsModule } from "./playlist-qcms/playlist-qcms.module"
import { PlaylistsModule } from "./playlists/playlists.module"
import { QcmsModule } from "./qcms/qcms.module"
import { RankingsModule } from "./rankings/rankings.module"
import { RedisModule } from "./redis/redis.module"
import { ReportsModule } from "./reports/reports.module"
import { StatisticsModule } from "./statistics/statistics.module"
import { TeamMembersModule } from "./team-members/team-members.module"
import { TeamSharedContentModule } from "./team-shared-content/team-shared-content.module"
import { TeamsModule } from "./teams/teams.module"
import { UploadsModule } from "./uploads/uploads.module"
import { UserActivityHistoryModule } from "./user-activity-history/user-activity-history.module"
import { UserAnswersModule } from "./user-answers/user-answers.module"
import { UserPointsModule } from "./user-points/user-points.module"
import { UsersModule } from "./users/users.module"
import { VoletsModule } from "./volets/volets.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DatabaseModule,
		RedisModule,
		AuthModule,
		UsersModule,
		ActivationCodesModule,
		VoletsModule,
		LessonsModule,
		QcmsModule,
		LayersModule,
		UserAnswersModule,
		LayerStatisticsModule,
		UserActivityHistoryModule,
		UserPointsModule,
		PlaylistsModule,
		PlaylistQcmsModule,
		NotesModule,
		CommentsModule,
		CommentVotesModule,
		ReportsModule,
		TeamsModule,
		TeamMembersModule,
		TeamSharedContentModule,
		NotificationsModule,
		CustomExamsModule,
		AdminModule,
		UploadsModule,
		RankingsModule,
		StatisticsModule,
		ModulesModule,
	],
	controllers: [AppController, ModulesController],
	providers: [AppService, ModulesService],
})
export class AppModule {}
