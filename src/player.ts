import {Land} from './land';
import {DevelopmentCard} from './development'
import {Resource} from './resources';

export class Player {
  readonly id: string;
  private readonly lands: Land[] = [];
  private readonly developmentCards: DevelopmentCard[] = [];
  private readonly resources: Resource[] = [];
  
  constructor(id: string) {
    this.id = id;
  }
}