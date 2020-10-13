import { Container, Inject, Module, Service } from '../../src';
import { CoffeeMaker } from './CoffeeMaker';

@Service()
export class SugarFactory {
  @Inject({ lazy: () => CoffeeMaker })
  private coffee!: CoffeeMaker;

  create() {
    return this.coffee.create();
  }

  make() {
    return 'SugarFactory make';
  }
}
