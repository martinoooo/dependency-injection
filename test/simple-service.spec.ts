import 'reflect-metadata';
import { Service, Container, Inject } from '../src';

describe('simple-service', function () {
  afterEach(() => Container.clear());

  describe('test1', () => {
    class CarFactory {
      create() {
        return 'Creating a car!';
      }
    }

    class Counter {
      private counter = 0;

      increase() {
        this.counter++;
      }

      getCount(): number {
        return this.counter;
      }
    }

    it('test1', function () {
      Container.registry(CarFactory);
      let carFactory = Container.get<CarFactory>(CarFactory);
      expect(carFactory.create()).toBe('Creating a car!');

      Container.registry(Counter);
      let counter = Container.get<Counter>(Counter);
      counter.increase();
      counter.increase();
      counter.increase();
      expect(counter.getCount()).toBe(3);
    });
  });

  describe('test2', () => {
    it('test2', function () {
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

      class WaterFactory {
        create() {
          return 'water created';
        }
      }

      class CoffeeMaker {
        @Inject()
        beanFactory: BeanFactory;

        @Inject()
        sugarFactory: SugarFactory;

        @Inject()
        waterFactory: WaterFactory;

        make() {
          return `${this.beanFactory.create()}, ${this.sugarFactory.create()}, ${this.waterFactory.create()}, coffee is made`;
        }
      }

      Container.registry(BeanFactory);
      Container.registry(SugarFactory);
      Container.registry(WaterFactory);
      Container.registry(CoffeeMaker);
      let coffeeMaker = Container.get<CoffeeMaker>(CoffeeMaker);
      expect(coffeeMaker.make()).toBe('bean created, sugar created, water created, coffee is made');
    });
  });

  describe('test3', () => {
    it('test3', function () {
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
        private beanFactory: BeanFactory;
        private sugarFactory: SugarFactory;
        private waterFactory: WaterFactory;

        constructor(beanFactory: BeanFactory, sugarFactory: SugarFactory, waterFactory: WaterFactory) {
          this.beanFactory = beanFactory;
          this.sugarFactory = sugarFactory;
          this.waterFactory = waterFactory;
        }

        make() {
          return `${this.beanFactory.create()}, ${this.sugarFactory.create()}, ${this.waterFactory.create()}, coffee is made`;
        }
      }

      let coffeeMaker = Container.get<CoffeeMaker>(CoffeeMaker);
      expect(coffeeMaker.make()).toBe('bean created, sugar created, water created, coffee is made');
    });
  });

  describe('test6', () => {
    it('test6', function () {
      @Service()
      class Bus {
        drive() {
          return 'Im driving the bus';
        }
      }

      @Service()
      class Car {
        drive() {
          return 'Im driving the car';
        }
      }

      @Service()
      class FakeBus {
        drive() {
          return 'This is a fake bus. Im driving fake bus';
        }
      }

      @Service()
      class FakeCar {
        drive() {
          return 'This is a fake car. Im driving fake car';
        }
      }

      @Service()
      class Driver {
        constructor(private bus: Bus, private car: Car) {}

        driveBus() {
          return this.bus.drive();
        }

        driveCar() {
          return this.car.drive();
        }
      }

      let driver = Container.get<Driver>(Driver);
      expect(driver.driveBus()).toBe('Im driving the bus');
      expect(driver.driveCar()).toBe('Im driving the car');

      // provide fake implementations
      Container.registry(Bus, { instance: new FakeBus() });
      Container.registry(Car, { instance: new FakeCar() });

      Container.registry(Driver);
      driver = Container.get<Driver>(Driver);
      // drive!
      expect(driver.driveBus()).toBe('This is a fake bus. Im driving fake bus');
      expect(driver.driveCar()).toBe('This is a fake car. Im driving fake car');
    });
  });

  describe('test7', () => {
    it('inherited-properies', function () {
      @Service()
      class Driver {
        name: string = 'Umed';
      }

      @Service()
      class Wheel {
        count: number = 4;
      }

      abstract class Car {
        @Inject()
        driver!: Driver;

        year = 2016;

        abstract drive(): void;
      }

      @Service()
      class BmwCar extends Car {
        @Inject()
        wheel!: Wheel;

        drive() {
          return this.driver.name + ' is driving bmw with ' + this.wheel.count + ' wheels';
        }
      }

      // drive bmw
      let bmwCar = Container.get<BmwCar>(BmwCar);
      expect(bmwCar.drive()).toBe('Umed is driving bmw with 4 wheels');
    });
  });

  describe('test9', () => {
    it('custom-decorator', function () {
      interface LoggerInterface {
        log(message: string): void;
      }

      // TODO: DELETE service
      @Service()
      class ConsoleLogger implements LoggerInterface {
        log(message: string) {
          return message;
        }
      }

      class TestLogger implements LoggerInterface {
        lastMessage: string;

        log(message: string) {
          this.lastMessage = message;
        }
      }

      class User {
        constructor(public firstName: string, public secondName: string) {}
      }

      @Service()
      class UserRepository {
        @Logger() private logger: LoggerInterface;

        save(user: User) {
          return this.logger.log(`user ${user.firstName} ${user.secondName} has been saved.`);
        }
      }

      function Logger() {
        return Inject(() => ConsoleLogger);
      }

      const userRepository = Container.get<UserRepository>(UserRepository);
      expect(userRepository.save(new User('Johny', 'Cage'))).toBe('user Johny Cage has been saved.');
      // const logger = new TestLogger();
      // Container.set(UserRepository, new UserRepository(logger));

      // const userRepository = Container.get(UserRepository);
      // userRepository.save(new User('Johny', 'Cage'));
      // console.log('last message in test logger: ', logger.lastMessage);
    });
  });
});
