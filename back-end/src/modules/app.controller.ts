import { Controller, Get } from "@nestjs/common"
import { AppService } from "./app.service"
import { RedisService } from "./redis/redis.service";


@Controller()
export class AppController {
	constructor(private readonly appService: AppService,
		private readonly redisService: RedisService ) {}

	@Get()
	getHello(): any {
		console.log('url in controller: '+ process.env.DATABASE_URL)
		this.redisService.test() 
		return this.appService.test()
	}

}
