import { Module } from '@nestjs/common';

import { UsersController } from './controllers';
import { UsersRepository } from './repositories';
import { UsersService } from './services';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
