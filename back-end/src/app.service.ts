import { Inject, Injectable } from '@nestjs/common';
import { users } from './drizzle/schema';
import { DATABASE_CONNECTION } from './drizzle/database-connection';
@Injectable()
export class AppService {
  constructor(@Inject(DATABASE_CONNECTION) private db: any) {}
  
  async test()  {
    return this.db.select().from(users);
  }
}


