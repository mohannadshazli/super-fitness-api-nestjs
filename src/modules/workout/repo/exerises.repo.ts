import { DataSource } from "typeorm";
import { Exercise } from "../entities/exercise.entity";
import { AbstractRepository } from "../../../DB/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExerciseRepo  extends AbstractRepository<Exercise>{
      protected readonly entity = Exercise;
    
      constructor(dataSource: DataSource) {
        super(dataSource);
      }
}