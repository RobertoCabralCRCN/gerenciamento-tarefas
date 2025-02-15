import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: { username: string; password: string }) {
    try {
      const user = await this.usersService.create(
        createUserDto.username,
        createUserDto.password,
      );
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
