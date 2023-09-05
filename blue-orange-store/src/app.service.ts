import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  testGuard(): string {
    return 'Test guard successful';
  }

  testJWTGuard(): string {
    return 'Test JWT successful';
  }
}
