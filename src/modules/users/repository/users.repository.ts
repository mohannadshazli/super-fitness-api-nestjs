import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../DB/repositories/abstract.repository';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly entity = User;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findUserDataById(id: number): Promise<User | null> {
    return this.findOne('e.id = :id', { id });
  }
  async save(entity: User): Promise<User> {
    return this.repository.save(entity);
  }

  
}
