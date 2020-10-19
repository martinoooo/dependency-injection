import 'reflect-metadata';
import { Container, Inject } from '../src';

describe('Inject', function () {
  beforeEach(() => Container.clear());

  describe('registry', () => {
    it('can inject a value', function () {
      class BeanFactory {
        create() {
          return 'bean created';
        }
      }

      class CoffeeMaker {
        @Inject()
        private beanFactory: BeanFactory;

        make() {
          return `${this.beanFactory.create()}`;
        }
      }

      Container.registry(BeanFactory);
      Container.registry(CoffeeMaker);

      let coffeeMaker = Container.get<CoffeeMaker>(CoffeeMaker);
      expect(coffeeMaker).toBeInstanceOf(CoffeeMaker);
      expect(coffeeMaker.make()).toEqual('bean created');
    });

    it('can inject a value in constroctor parmas', function () {
      class BeanFactory {
        create() {
          return 'bean created';
        }
      }

      class CoffeeMaker {
        constructor(@Inject() private beanFactory: BeanFactory) {}

        make() {
          return `${this.beanFactory.create()}`;
        }
      }

      Container.registry(BeanFactory);
      Container.registry(CoffeeMaker);

      let coffeeMaker = Container.get<CoffeeMaker>(CoffeeMaker);
      expect(coffeeMaker).toBeInstanceOf(CoffeeMaker);
      expect(coffeeMaker.make()).toEqual('bean created');
    });

    it('can inject a value in both way', function () {
      class BeanFactory {
        create() {
          return 'bean created';
        }
      }

      class SugarFactory {
        create() {
          return 'sugar created';
        }
      }

      class CoffeeMaker {
        @Inject()
        private beanFactory: BeanFactory;

        constructor(@Inject() private sugarFactory: SugarFactory) {}

        make() {
          return `${this.beanFactory.create()}, ${this.sugarFactory.create()}`;
        }
      }

      Container.registry(BeanFactory);
      Container.registry(SugarFactory);
      Container.registry(CoffeeMaker);

      let coffeeMaker = Container.get<CoffeeMaker>(CoffeeMaker);
      expect(coffeeMaker).toBeInstanceOf(CoffeeMaker);
      expect(coffeeMaker.make()).toEqual('bean created, sugar created');
    });

    it('can inject a named value', function () {
      abstract class Factory {
        abstract create(): string;
      }

      class SugarFactory extends Factory {
        create() {
          return 'sugar created';
        }
      }

      class CoffeeMaker {
        @Inject({ token: 'sugar-factory' })
        private beanFactory: Factory;

        constructor() {}

        make() {
          return `${this.beanFactory.create()}`;
        }
      }

      Container.registry('sugar-factory', SugarFactory);
      Container.registry(CoffeeMaker);

      let coffeeMaker = Container.get<CoffeeMaker>(CoffeeMaker);
      expect(coffeeMaker).toBeInstanceOf(CoffeeMaker);
      expect(coffeeMaker.make()).toEqual('sugar created');
    });

    it('can inject a named value in constroctor params', function () {
      abstract class Factory {
        abstract create(): string;
      }

      class SugarFactory extends Factory {
        create() {
          return 'sugar created';
        }
      }

      class CoffeeMaker {
        constructor(
          @Inject({ token: 'sugar-factory' })
          private beanFactory: Factory
        ) {}

        make() {
          return `${this.beanFactory.create()}`;
        }
      }

      Container.registry('sugar-factory', SugarFactory);
      Container.registry(CoffeeMaker);

      let coffeeMaker = Container.get<CoffeeMaker>(CoffeeMaker);
      expect(coffeeMaker).toBeInstanceOf(CoffeeMaker);
      expect(coffeeMaker.make()).toEqual('sugar created');
    });

    it('circular reference', async function () {
      await import('../example/circular').then(({ CoffeeMaker }) => {
        let coffeeMaker = Container.get<any>(CoffeeMaker);
        expect(coffeeMaker).toBeInstanceOf(CoffeeMaker);
        expect(coffeeMaker.make()).toEqual('SugarFactory make');
      });
    });
  });
});
