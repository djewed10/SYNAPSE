import { Inject, Injectable } from '@nestjs/common';
import { users } from './drizzle/schema';

@Injectable()
export class AppService {
  constructor(@Inject('database_connection') private db: any) {}

  async test()  {
    return this.db.select().from(users);
  }
}


