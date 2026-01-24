import { Inject, Injectable } from '@nestjs/common';
import { users } from './database/schema';
import { DATABASE_CONNECTION } from './database/database-connection';
@Injectable()
export class AppService {
  constructor(@Inject(DATABASE_CONNECTION) private db: any) {}
  
  async test()  {
     return this.db.select({name:users.name,email:users.email}).from(users);
  }
}


