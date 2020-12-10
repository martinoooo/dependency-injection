import 'reflect-metadata';
import { Service, Container, Inject } from '../src';

describe('Container', function () {
  beforeEach(() => Container.clear());

  describe('registry', () => {
    class Duck {
      bark() {
        return 'barking';
      }
    }

    it('can registy a class', function () {
      Container.registry(Duck);
      let duck = Container.get(Duck);

      expect(duck).toBeInstanceOf(Duck);
      expect(duck.bark()).toEqual('barking');
    });

    it('can registy a token with a instance', function () {
      const duckins = new Duck();
      Container.registry('duck', { instance: duckins });
      let duck = Container.get<Duck>('duck');

      expect(duck).toBe(duckins);
      expect(duck.bark()).toEqual('barking');
    });

    it('should registry a new instance if set twice', function () {
      const duckins = new Duck();
      Container.registry(Duck, { instance: duckins });
      expect(Container.get<Duck>(Duck)).toBe(duckins);

      const duckins2 = new Duck();
      Container.registry(Duck, { instance: duckins2 });
      expect(Container.get<Duck>(Duck)).toBe(duckins2);
    });

    it('should throw err when get unregistried token', function () {
      expect(() => Container.get<Duck>(Duck)).toThrowError(Error);
    });

    it('should use the registried instance', function () {
      class DuckFac {
        @Inject()
        duck: Duck;

        getDuck() {
          return this.duck;
        }
      }

      Container.registry(Duck);
      let duck = Container.get<Duck>(Duck);

      Container.registry(DuckFac);
      let duckFac = Container.get<DuckFac>(DuckFac);

      expect(duckFac.getDuck()).toBe(duck);
    });
  });
});
