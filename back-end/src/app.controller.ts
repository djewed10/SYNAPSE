import { Controller, Get } from "@nestjs/common"
import { AppService } from "./app.service"

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): any {
		console.log('url in controller: '+ process.env.DATABASE_URL)
		return this.appService.test()
	}
}
