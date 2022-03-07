import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() : String {
    return "Hello API";
  }
}
