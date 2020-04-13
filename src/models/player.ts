import {TileCorner} from './tile-corner';
import {DevelopmentCard} from './development'
import {Resource} from './resources';

export class Player {
  readonly id: string;
  private readonly lands: TileCorner [] = [];
  private readonly developmentCards: DevelopmentCard[] = [];
  private readonly resources: Resource[] = [];
  
  constructor(id: string) {
    this.id = id;
  }
}
