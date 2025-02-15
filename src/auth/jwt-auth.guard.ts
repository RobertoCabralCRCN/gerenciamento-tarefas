import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);

  handleRequest(err, user) {
    if (err) {
      this.logger.error('Authentication error:', err);
    }
    if (!user) {
      this.logger.warn('Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log('User found:', user);
    return user;
  }
}
