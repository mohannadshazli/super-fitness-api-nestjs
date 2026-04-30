import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../DB/repositories/abstract.repository';
import { DataSource } from 'typeorm';
import { Otp } from '../entities/otp.entity';

@Injectable()
export class  OptRepository extends AbstractRepository<Otp> {
  protected readonly entity = Otp;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
}
