import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserProfileRepository } from './repository/user-profile.repository';
import { Gender } from './dto/gender.type';
import { User } from './entities/user.entity';
import { LoginDto } from '../auth/dto/login.dto';
import { comparePassword, hashPassword } from '../../common/security/hash.util';
import { UsersRepository } from './repository/users.repository';
import type { UserGoal } from './dto/user-goal.enum';
import { ActivityLevel } from './dto/user-activity-level.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { WorkoutGoal } from '../workout/enums/workout.goal';
import { AuthService } from '../auth/auth.service';
import { OptRepository } from '../auth/reposatories/opt.repository';



@Injectable()
export class UsersService {
  constructor(
    private readonly usersProfileRepository: UserProfileRepository,
    private readonly userRepo: UsersRepository,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    @Inject(forwardRef(() => OptRepository)) private optRepo: OptRepository,
  ) {}

  // ======================
  // CREATE USER
  // ======================
  async createUser(dto: CreateUserDto) {
    const existingUser = await this.userRepo.findOne('e.email = :email', {
      email: dto.email,
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashPassword(dto.password);

    return this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });
  }

  // ======================
  // GET OR CREATE PROFILE
  // ======================
  async getOrCreateProfile(userId: string) {
    let profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId }
    );

    if (!profile) {
      profile = await this.usersProfileRepository.create({
        user: { id: userId } as User,
        registration_step: 0,
      });
    }

    return profile;
  }

  // ======================
  // UPDATE GENDER
  // ======================
  async updateGender(userId: string, gender: Gender) {
    const profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId },
    );

    // 1) لو مفيش profile → اعمله
    if (!profile) {
      return this.usersProfileRepository.create({
        user: { id: userId } as User,
        gender,
        registration_step: 1,
      });
    }

    // 2) لو موجود → عدّل عليه
    profile.gender = gender;
    profile.registration_step = 1;

    return this.usersProfileRepository.update(
      'e.userId = :userId',
      { userId },
      profile,
    );
  }

  // ======================
  // UPDATE AGE
  // ======================
  async updateAge(userId: string, age: number) {
    let profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId },
    );

    // لو مفيش profile → اعمله
    if (!profile) {
      profile = await this.usersProfileRepository.create({
        user: { id: userId } as User,
        age,
        registration_step: 2,
      });

      return profile;
    }

    // لو موجود → عدّل
    profile.age = age;
    profile.registration_step = 2;

    return this.usersProfileRepository.update(
      '"userId" = :userId',
      { userId },
      profile,
    );
  }

  // ======================
  // UPDATE WEIGHT
  // ======================
  async updateWeight(userId: string, weight: number) {
    const profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId }
    );

    if (!profile) return null; 

    profile.weight = weight;
    profile.registration_step = 3;

    return this.usersProfileRepository.update(
      '"userId" = :userId',
      { userId },
      profile,
    );
  }

  // ======================
  // UPDATE HEIGHT
  // ======================
  async updateHeight(userId: string, height: number) {
    const profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId }
    );

    if (!profile) return null;

    profile.height = height;
    profile.registration_step = 4;

    return this.usersProfileRepository.update(
      '"userId" = :userId',
      { userId },
      profile,
    );
  }

  // ======================
  // UPDATE GOAL
  // ======================
  async updateGoal(userId: string, goal: UserGoal) {
    const profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId }
    );

    if (profile) {
      profile.goal = goal as WorkoutGoal;
      profile.registration_step = 5;
      return this.usersProfileRepository.create(profile);
    }

    return profile;
  }

  // ======================
  // UPDATE ACTIVITY LEVEL
  // ======================
  async updateActivityLevel(userId: string, activityLevel: ActivityLevel) {
    let profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId }
    );

    if (profile) {
      profile.activity_level = activityLevel;
      profile.registration_step = 6;
      profile = await this.usersProfileRepository.create(profile);
    }




    return profile;
  }

  // ======================
  // VALIDATE USER
  // ======================
  async validateUser(data: LoginDto): Promise<User> {
    const { email, password } = data;


    const user = await this.userRepo.findOne('e.email = :email', {
      email,

    });


    if (!user) {
      console.log('login user');
      throw new Error('Invalid credentials');
    }


    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }


    return user;
  }

  // ======================
  // CHECK USER EXISTS
  // ======================
  UserExistsByEmail = async (email: string): Promise<User> => {
    const user = await this.userRepo.findOne('e.email = :email', {
      email,
    });


    if (!user) {
      throw new Error('Invalid credentials');
    }


    return user;
  };

  // ======================
  // GET USER DATA
  // ======================
  async getUserData(userId: string) {
    return this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId }
    );
  }
}
