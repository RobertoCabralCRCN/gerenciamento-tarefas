import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    this.logger.log(`Trying to find user: ${username}`);
    const user = await this.userService.findOne(username);
    this.logger.log('User found:', user);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    this.logger.log(`Password valid: ${isPasswordValid}`);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user;
  }

  async login(username: string, password: string) {
    this.logger.log(`Trying to login with: ${username}`);
    const user = await this.validateUser(username, password);

    const payload = { username: user.username, sub: user.id };
    this.logger.log('Generated token payload:', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
