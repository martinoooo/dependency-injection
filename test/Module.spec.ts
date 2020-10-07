import 'reflect-metadata';
import { Container, Inject, Module, Service } from '../src';

describe('Container', function () {
  //  beforeEach(() => Container.clear());

  describe('registry', () => {
    it('can registy a class', function () {
      @Service()
      class Provider {
        read() {
          return 'read';
        }
      }

      class Consumer {
        @Inject()
        private provider: Provider;

        read() {
          return this.provider.read();
        }
      }

      @Module({
        providers: [Provider],
        consumers: [Consumer],
      })
      class App {
        init() {
          return "I'm init";
        }
      }

      // const app = Container.get<App>(App);
      // expect(app.init()).toBe("I'm init");

      // const consumer = Container.get<Consumer>(App, Consumer);
      // expect(consumer.read()).toBe('read');
    });
  });
});
