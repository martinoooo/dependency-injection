import 'reflect-metadata';
import { Container, Inject, Module, Service } from '../src';

describe('Service', function () {
  beforeEach(() => Container.clear());

  describe('registry', () => {
    it('can registy a service if using decorators', function () {
      @Service()
      class Duck {
        bark() {
          return 'barking';
        }
      }

      let duck = Container.get<Duck>(Duck);

      expect(duck).toBeInstanceOf(Duck);
      expect(duck.bark()).toEqual('barking');
    });

    it('can registy a named service', function () {
      @Service({ token: 'myDuck' })
      class Duck {
        bark() {
          return 'barking';
        }
      }

      let duck = Container.get<Duck>('myDuck');
      expect(duck).toBeInstanceOf(Duck);
      expect(duck.bark()).toEqual('barking');
    });
  });
});
