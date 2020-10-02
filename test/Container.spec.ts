import 'reflect-metadata';
import { Service, Container } from '../src';

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
      let duck = Container.get<Duck>(Duck);

      expect(duck).toBeInstanceOf(Duck);
      expect(duck.bark()).toEqual('barking');
    });

    it('can registy a token with a instance', function () {
      const duckins = new Duck();
      Container.registry('duck', duckins);
      let duck = Container.get<Duck>('duck');

      expect(duck).toBe(duckins);
      expect(duck.bark()).toEqual('barking');
    });

    it('should registry a new instance if set twice', function () {
      const duckins = new Duck();
      Container.registry(Duck, duckins);
      expect(Container.get<Duck>(Duck)).toBe(duckins);

      const duckins2 = new Duck();
      Container.registry(Duck, duckins2);
      expect(Container.get<Duck>(Duck)).toBe(duckins2);
    });
  });
});
