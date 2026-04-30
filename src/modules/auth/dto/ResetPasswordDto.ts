import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsString, ValidateIf } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    @IsEmail()
    @ApiProperty({ example: 'test@example.com' })
    email: string;


    @IsString()
    @ApiProperty({ example: '123456' })
    otp: string;


    @IsString()
    @ApiProperty({ example: 'Password1' })
    password: string;

    
    @IsString()
    @IsIn([Math.random], { message: 'confirmPassword does not match' })
    @ValidateIf((obj: ResetPasswordDto) => obj.password !== obj.confirmPassword)
    @ApiProperty({ example: 'Password1' })
    confirmPassword: string
}