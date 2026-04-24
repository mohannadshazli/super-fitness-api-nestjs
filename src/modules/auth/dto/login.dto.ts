import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'Example@gmail.com' })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Password1' })
    @IsString()
    password: string;
}