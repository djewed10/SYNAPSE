import { Module } from "@nestjs/common"
import { ActivationCodesController } from "./activation-codes.controller"
import { ActivationCodesRepository } from "./activation-codes.repository"
import { ActivationCodesService } from "./activation-codes.service"
import { DatabaseModule } from "src/database/database.module"

@Module({
	imports: [DatabaseModule],
	controllers: [ActivationCodesController],
	providers: [ActivationCodesService, ActivationCodesRepository],
	exports: [ActivationCodesService, ActivationCodesRepository],
})
export class ActivationCodesModule {}
