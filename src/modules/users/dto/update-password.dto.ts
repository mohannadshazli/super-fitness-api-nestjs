import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';
import { Match } from '../../../common/decorators/match.decorator';
import { NotMatch } from '../../../common/decorators/not-match.decorator';
// إذا قمت بإنشاء ديكوريتور NotMatch يمكنك استيراده هنا، لكن سأعطيك الحل الجاهز بالـ RegEx أولاً لحين رغبتك في فصله.

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty({ example: 'Password1' })
  oldPassword: string;

  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  // التعديل هنا: أضفنا (?=.*[!@#$%^&*(),.?":{}|<>]) للتأكد من وجود رمز خاص واحد على الأقل
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  @NotMatch('oldPassword', {
    message: 'New password must be different from old password',
  })
  @ApiProperty({ example: 'NewPassword1!' })
  newPassword: string;

  @IsString()
  @Match('newPassword', {
    message: 'confirmNewPassword does not match newPassword',
  })
  @ApiProperty({ example: 'NewPassword1!' })
  confirmNewPassword: string;
}
