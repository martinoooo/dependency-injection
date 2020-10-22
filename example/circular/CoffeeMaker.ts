import { Container, Inject, Service } from '../../src';
import { SugarFactory } from './SugarFactory';

@Service()
export class CoffeeMaker {
  @Inject({ lazy: () => SugarFactory })
  private sugar!: SugarFactory;

  make() {
    return this.sugar.make();
  }

  create() {
    return `CoffeeMaker Create`;
  }
}
