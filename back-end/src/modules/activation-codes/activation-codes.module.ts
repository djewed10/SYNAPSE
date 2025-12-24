import { Module } from "@nestjs/common"
import { DatabaseModule } from "../../database/database.module"
import { ActivationCodesController } from "./activation-codes.controller"
import { ActivationCodesRepository } from "./activation-codes.repository"
import { ActivationCodesService } from "./activation-codes.service"

@Module({
	imports: [DatabaseModule],
	controllers: [ActivationCodesController],
	providers: [ActivationCodesService, ActivationCodesRepository],
	exports: [ActivationCodesService, ActivationCodesRepository],
})
export class ActivationCodesModule {}
