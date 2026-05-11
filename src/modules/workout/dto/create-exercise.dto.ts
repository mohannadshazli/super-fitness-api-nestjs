import {
    IsString,
    IsOptional,
    IsNumber,
    Min,
} from 'class-validator';

export class CreateExerciseDto {

    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    sets?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    reps?: number;

    @IsOptional()
    @IsString()
    duration?: string;

    @IsOptional()
    @IsString()
    rest?: string;
}