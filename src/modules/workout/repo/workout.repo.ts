import { DataSource } from "typeorm";
import { AbstractRepository } from "../../../DB/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Workout } from "../entities/workout.entity";

@Injectable()
export class WorkoutRepo  extends AbstractRepository<Workout>{
      protected readonly entity = Workout;
    
      constructor(dataSource: DataSource) {
        super(dataSource);
      }
}