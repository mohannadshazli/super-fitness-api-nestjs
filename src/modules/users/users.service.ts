import { BadRequestException, Injectable } from '@nestjs/common';
import { UserProfileRepository } from './repository/user-profile.repository';
import { Gender } from './dto/gender.type';
import { User } from './entities/user.entity';
import { LoginDto } from '../auth/dto/login.dto';
import { comparePassword, hashPassword } from '../../common/security/hash.util';
import { UsersRepository } from './repository/users.repository';
import { UserGoal } from './dto/user-goal.enum';
import { ActivityLevel } from './dto/user-activity-level.enum';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersProfileRepository: UserProfileRepository,
    private readonly userRepo: UsersRepository,
  ) {}

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.userRepo.findOne('e.email = :email', {
      email: dto.email,
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashPassword(dto.password);

    const user = await this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

    return user;
  }

  async getOrCreateProfile(userId: string) {
    let profile = await this.usersProfileRepository.findOne('user_id = $1', [
      userId,
    ]);

    if (!profile) {
      profile = await this.usersProfileRepository.create({
        user: { id: userId } as User,
        registration_step: 0,
      });
    }

    return profile;
  }

  // 🔥 update gender
  async updateGender(userId: string, gender: Gender) {
    return this.usersProfileRepository.update('user_id = $1', [userId], {
      gender,
      registration_step: 1,
    });
  }

  // 🔥 update age
  async updateAge(userId: string, age: number) {
    return this.usersProfileRepository.update('user_id = $1', [userId], {
      age,
      registration_step: 2,
    });
  }

  // 🔥 update weight
  async updateWeight(userId: string, weight: number) {
    return this.usersProfileRepository.update('user_id = $1', [userId], {
      weight,
      registration_step: 3,
    });
  }

  // 🔥 update height
  async updateHeight(userId: string, height: number) {
    return this.usersProfileRepository.update('user_id = $1', [userId], {
      height,
      registration_step: 4,
    });
  }

  // 🔥 update goal
  async updateGoal(userId: string, goal: UserGoal) {
    return this.usersProfileRepository.update('user_id = $1', [userId], {
      goal,
      registration_step: 5,
    });
  }

  // 🔥 update activity level
  async updateActivityLevel(userId: string, activityLevel: ActivityLevel) {
    return this.usersProfileRepository.update('user_id = $1', [userId], {
      activity_level: activityLevel,
      registration_step: 6,
    });
  }

  async validateUser(data: LoginDto): Promise<User> {
    const { email, password } = data;
    const user = await this.userRepo.findOne('e.email = :email', {
      email: email,
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    return user;
  }







  UserExistsByEmail = async (email: string): Promise<User> => {

    const user = await this.userRepo.findOne('e.email = :email', {
      email: email,
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}
