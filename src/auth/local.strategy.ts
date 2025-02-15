import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.log(`Validating user: ${username}`);
    const result = await this.authService.validateUser(username, password);

    this.logger.log(
      `Validation result: ${result ? 'User found' : 'User not found'}`,
    );
    if (!result) {
      throw new Error('Invalid credentials');
    }
    return result;
  }
}
