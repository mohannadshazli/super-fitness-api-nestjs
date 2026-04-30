import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from './repository/user-profile.repository';
import { Gender } from './dto/gender.type';
import { User } from './entities/user.entity';
import { LoginDto } from '../auth/dto/login.dto';
import { comparePassword } from '../../common/security/hash.util';
import { UsersRepository } from './repository/users.repository';


@Injectable()
export class UsersService {
  constructor(private readonly usersProfileRepository: UserProfileRepository, private readonly userRepo: UsersRepository) { }

  async getOrCreateProfile(userId: string) {
    let profile = await this.usersProfileRepository.findOne(
      'user_id = $1',
      [userId],
    );

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
    return this.usersProfileRepository.update(
      'user_id = $1',
      [userId],
      {
        gender,
        registration_step: 1,
      },
    );
  }

  // 🔥 update age
  async updateAge(userId: string, age: number) {
    return this.usersProfileRepository.update(
      'user_id = $1',
      [userId],
      {
        age,
        registration_step: 2,
      },
    );
  }

  // 🔥 update weight
  async updateWeight(userId: string, weight: number) {
    return this.usersProfileRepository.update(
      'user_id = $1',
      [userId],
      {
        weight,
        registration_step: 3,
      },
    );
  }

  // 🔥 update height
  async updateHeight(userId: string, height: number) {
    return this.usersProfileRepository.update(
      'user_id = $1',
      [userId],
      {
        height,
        registration_step: 4,
      },
    );
  }




  async validateUser(data: LoginDto): Promise<User> {
    const { email, password } = data;
    const user = await this.userRepo.findOne('email = :email', {
      email: email,
    });

    if (!user) {
      throw new Error('user not found');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
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
