import 'reflect-metadata';
import { Container, Inject, Module, Service, Scope } from '../src';

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
      @Service({ scope: Scope.TRANSIENT })
      class Duck {
        bark() {
          return 'barking';
        }
      }

      let duck1 = Container.get<Duck>(Duck);
      let duck2 = Container.get<Duck>(Duck);
      expect(duck1).not.toBe(duck2);
    });

    it('can registy a request scope service', async function () {
      @Service()
      class Duck {
        private _duck;
        setDuck(num) {
          this._duck = num;
        }
        bark() {
          return this._duck;
        }
      }

      class Con {
        @Inject()
        duck: Duck;

        public async getDuck(num: number) {
          this.duck.setDuck(num);
          await new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, num);
          });
          return this.duck.bark();
        }
      }

      const moduleToken1 = 'test1';
      Container.registryModule({ token: moduleToken1, providers: [Duck], imp: Con });
      let duck1 = Container.get<Con>(moduleToken1, Con);
      const promise1 = duck1.getDuck(1);

      const moduleToken2 = 'test2';
      Container.registryModule({ token: moduleToken2, providers: [Duck], imp: Con });
      let duck2 = Container.get<Con>(moduleToken2, Con);
      const promise2 = duck2.getDuck(1000);

      const [res1, res2] = await Promise.all([promise1, promise2]);

      expect(duck1).not.toBe(duck2);
      expect(duck1.duck).not.toBe(duck2.duck);
      expect(res1).toBe(1);
      expect(res2).toBe(1000);
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

      expect(duck.make()).toEqual('bean created, sugar created, water created, coffee is made');
    });
  });
});
