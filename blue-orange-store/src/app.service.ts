import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  testGuard(): string {
    return 'Test guard sucessful';
  }
}
