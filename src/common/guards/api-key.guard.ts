import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey  = request.headers['x-api-key'];
    const valid   = this.config.get('API_KEY');

    if (!apiKey || apiKey !== valid) {
      throw new UnauthorizedException('API key inválida');
    }

    return true;
  }
}
