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
import { UserGoal } from './dto/user-goal.enum';
import { ActivityLevel } from './dto/user-activity-level.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
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
      { userId },
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
      { userId },
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
      { userId },
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
      { userId },
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
      { userId },
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
    return this.usersProfileRepository.findOne('e.userId = :userId', {
      userId,
    });
  }

  async updateUserProfile(userId: string, dto: UpdateProfileDto) {
    const dailyCalories = await this.calculateDailyCalories(dto);

    return this.usersProfileRepository.update(
      '"userId"= :userId',
      { userId },
      {
        gender: dto.gender,
        age: dto.age,
        weight: dto.weight,
        height: dto.height,
        goal: dto.goal,
        activity_level: dto.activityLevel,
        daily_calories: dailyCalories,
      },
    );
  }

  async calculateDailyCalories(data: UpdateProfileDto): Promise<number> {
    const s = data.gender === 'male' ? 5 : -161;

    const bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + s;

    const activityMultiplier = {
      Rookie: 1.2,
      Beginner: 1.375,
      Intermediate: 1.55,
      Advanced: 1.725,
      'True Beast': 1.9,
    };

    let calories = bmr * activityMultiplier[data.activityLevel];

    if (data.goal === WorkoutGoal.GAIN_MUSCLE) calories += 400;
    if (data.goal === WorkoutGoal.LOSE_WEIGHT) calories -= 400;

    return Math.round(calories);
  }

  // ======================
  // UPDATE USER EMAIL
  // ======================
  async updateUserEmail(userId: string, newEmail: string) {
    const existingUser = await this.userRepo.findOne('e.email = :email', {
      email: newEmail,
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    await this.authService.generateOtp(newEmail);

    return {
      success: true,
      message: 'OTP sent successfully',
    };
  }

  // ======================
  // RESET USER EMAIL
  // ======================
  async resetUserEmail(userId: string, newEmail: string, otp: string) {
    const existingUser = await this.userRepo.findOne('e.email = :email', {
      email: newEmail,
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const existingOtp = await this.optRepo.findOne('e.email = :email', {
      email: newEmail,
    });

    if (!existingOtp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (existingOtp.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.userRepo.update('id = :id', { id: userId }, { email: newEmail });

    await this.optRepo.delete('email = :email', { email: newEmail });

    return {
      success: true,
      message: 'Email updated successfully',
    };
  }

  // ======================
  // UPDATE PASSWORD
  // ======================
  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.userRepo.findOne('id = :id', { id: userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await comparePassword(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await hashPassword(newPassword);
    await this.userRepo.update(
      'id = :id',
      { id: userId },
      { password: hashedPassword },
    );

    return {
      success: true,
      message: 'Password updated successfully',
    };
  }
}
