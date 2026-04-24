import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './repository/users.repository';
import { UserProfileRepository } from './repository/user-profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository,UserProfileRepository],
  exports: [UsersRepository, UsersService, UserProfileRepository],
})
export class UsersModule {}
