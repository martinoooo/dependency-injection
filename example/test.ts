import 'reflect-metadata';
import { Container } from '../src';

export class Duck {
  bark() {
    console.log('barking');
  }
}

Container.registry(Duck);
let carFactory = Container.get<Duck>(Duck);
carFactory.bark();
