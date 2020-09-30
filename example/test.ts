import 'reflect-metadata';
import { Service, Factory } from '../src';

class OtherService {
  a = 1;
}

@Service()
class TestService {
  constructor(public readonly otherService: OtherService) {}

  testMethod() {
    console.log(this.otherService.a);
  }
}

Factory(TestService).testMethod(); // 1
