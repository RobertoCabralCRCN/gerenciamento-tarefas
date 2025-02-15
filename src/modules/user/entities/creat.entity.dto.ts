import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  password: string;
}
