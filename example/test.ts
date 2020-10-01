import 'reflect-metadata';
import { Service, Container } from '../src';

@Service()
export class Duck {
  bark() {
    console.log('barking');
  }
}

// Container.registry(Duck);
let carFactory = Container.get<Duck>(Duck);
carFactory.bark();
