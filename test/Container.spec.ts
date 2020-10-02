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

    it('can registy a class with a instance', function () {
      const duckset = new Duck();
      Container.registry(Duck, duckset);
      let duck = Container.get<Duck>(Duck);

      expect(duck).toBe(duckset);
      expect(duck.bark()).toEqual('barking');
    });
  });
});
