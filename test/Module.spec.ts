import 'reflect-metadata';
import { Container, Inject, Module, Service } from '../src';

describe('Container', function () {
  // beforeEach(() => Container.clear());

  describe('registry', () => {
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

    it('can registy the module', function () {
      const app = Container.get<App>(App);
      expect(app.init()).toBe("I'm init");
    });

    it('the service got from the module is different from the global', function () {
      const provider = Container.get<Provider>(App, Provider);
      const provider2 = Container.get<Provider>(Provider);
      expect(provider).not.toBe(provider2);
    });

    it('can registry the service in module', function () {
      const provider = Container.get<Provider>(App, Provider);
      expect(provider.read()).toBe('read');
    });

    it('Inject works well', function () {
      const consumer = Container.get<Provider>(App, Consumer);
      expect(consumer.read()).toBe('read');
    });
  });
});
