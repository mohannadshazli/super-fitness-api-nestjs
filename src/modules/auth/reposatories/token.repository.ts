import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../DB/repositories/abstract.repository';
import { DataSource } from 'typeorm';
import { Token } from '../entities/token.entity';


@Injectable()
export class  TokenRepository extends AbstractRepository<Token> {
  protected readonly entity = Token;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
}
