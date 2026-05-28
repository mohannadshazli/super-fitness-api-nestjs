import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { WorkoutService } from './workout_exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import type { AuthRequest } from '../../common/types/req.type';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { FileUploadService } from '../../common/services/file-upload-service/file-upload.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { WorkoutGoal } from './enums/workout.goal';

@ApiTags('Workout')
@ApiBearerAuth()
@Controller('workout')
export class WorkoutController {
  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly workoutService: WorkoutService,
  ) {}

  @Post('/create-workout')
  createWorkout(@Body() dto: CreateWorkoutDto) {
    return this.workoutService.createWorkout(dto);
  }

  @Get('exercises-by-goal')
   getExercisesByGoal(
    @Query('goal', new ParseEnumPipe(WorkoutGoal)) goal: WorkoutGoal,

    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,

    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.workoutService.getExercisesByGoal(goal, page, limit);
  }

  @Post(':workoutId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ]),
  )
  async createExercise(
    @Param('workoutId') workoutId: string,
    @Body() dto: CreateExerciseDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    const imageFile = files.image?.[0];
    const videoFile = files.video?.[0];

    if (imageFile && !imageFile.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      throw new BadRequestException('Invalid image format');
    }
    if (videoFile && !videoFile.mimetype.match(/\/(mp4|avi|mov|wmv)$/)) {
      throw new BadRequestException('Invalid video format');
    }

    let image_url: string | undefined = undefined;
    let image_public_id: string | undefined = undefined;
    let video_url: string | undefined = undefined;
    let video_public_id: string | undefined = undefined;

    if (imageFile) {
      const uploadedImage = await this.fileUploadService.uploadImage(imageFile);
      ({ image_url, image_public_id } = uploadedImage);
    }

    if (videoFile) {
      const uploadedVideo = await this.fileUploadService.uploadVideo(videoFile);
      ({ video_url, video_public_id } = uploadedVideo);
    }

    return this.workoutService.createExercise(Number(workoutId), {
      ...dto,
      image_url,
      video_url,
      image_public_id,
      video_public_id,
    });
  }

  @Get('exercises/:workoutId')
  getExercises(@Param('workoutId') id: string) {
    return this.workoutService.getExercisesByWorkout(
      Number(id),
    );
  }



  @Get('recommend')
  getRecommendations(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.workoutService.getRecommendations(userId);
  }
}
