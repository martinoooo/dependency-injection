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

    it('can registy a non-singleton service', function () {
      @Service({ transient: true })
      class Duck {
        bark() {
          return 'barking';
        }
      }

      let duck1 = Container.get<Duck>(Duck);
      let duck2 = Container.get<Duck>(Duck);
      expect(duck1).not.toBe(duck2);
    });

    it('can use the constructor params if using decorators', function () {
      @Service()
      class BeanFactory {
        create() {
          return 'bean created';
        }
      }

      @Service()
      class SugarFactory {
        create() {
          return 'sugar created';
        }
      }

      @Service()
      class WaterFactory {
        create() {
          return 'water created';
        }
      }

      @Service()
      class CoffeeMaker {
        constructor(
          private beanFactory: BeanFactory,
          private sugarFactory: SugarFactory,
          private waterFactory: WaterFactory
        ) {}

        make() {
          return `${this.beanFactory.create()}, ${this.sugarFactory.create()}, ${this.waterFactory.create()}, coffee is made`;
        }
      }

      let duck = Container.get<CoffeeMaker>(CoffeeMaker);

      expect(duck.make()).toEqual("bean created, sugar created, water created, coffee is made");
    });
  });
});
