import { PickType } from '@nestjs/swagger';
import { ResetPasswordDto } from '../../auth/dto/ResetPasswordDto';

export class ResetEmailDto extends PickType(ResetPasswordDto, [
  'email',
  'otp',
]) {}
