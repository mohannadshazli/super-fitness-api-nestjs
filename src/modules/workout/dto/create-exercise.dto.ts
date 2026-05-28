import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({ example: 'Bicep Curls' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A great exercise for building bicep strength.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  sets: number;

  @ApiProperty({ example: 12 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  reps: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumber()
  duration_in_minutes: number;

  @ApiProperty({ example: 60 })
  @IsOptional()
  @IsNumber()
  rest_in_seconds: number;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  image?: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  video?: any;
}
