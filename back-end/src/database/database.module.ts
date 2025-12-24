import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { DATABASE_CONNECTION } from "./database-connection"
import * as postsSchema from "./schema"

@Module({
	providers: [
		{
			provide: DATABASE_CONNECTION,
			useFactory: (configService: ConfigService) => {
				console.log(
					`url in factory: ${configService.getOrThrow("DATABASE_URL")}`,
				)
				const pool = new Pool({
					connectionString: configService.getOrThrow("DATABASE_URL"),
				})
				return drizzle(pool, {
					schema: {
						...postsSchema,
					},
				})
			},
			inject: [ConfigService],
		},
	],
	exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
