import 'reflect-metadata';
import { Container, Inject, Scope, Service } from '../src';

describe('Module', function () {
  describe('registry', () => {
    @Service()
    class Provider {
      read() {
        return 'read';
      }
    }

    @Service()
    class Consumer {
      @Inject()
      private provider: Provider;

      read() {
        return this.provider.read();
      }
    }

    @Scope({
      providers: [Provider, { token: 'consumer', imp: Consumer }],
    })
    class App {
      @Inject()
      private consumer: Consumer;

      init() {
        return "I'm init";
      }

      read() {
        return this.consumer.read();
      }
    }

    it('can registy the module', function () {
      const app = Container.get<App>(App, App);
      expect(app.init()).toBe("I'm init");
    });

    it('the service got from the module is different from the global', function () {
      const provider_in_module = Container.get(App, Provider);
      const provider_in_global = Container.get(Provider);
      expect(provider_in_module).not.toBe(provider_in_global);
    });

    it('can registry the service in module', function () {
      const provider = Container.get(App, Provider);
      expect(provider.read()).toBe('read');
    });

    it('Inject works well', function () {
      const consumer = Container.get<Provider>(App, 'consumer');
      expect(consumer.read()).toBe('read');

      const app = Container.get<App>(App, App);
      expect(app.read()).toBe('read');
    });
  });
});
