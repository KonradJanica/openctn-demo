import {TileCorner} from './tile-corner';
import {DevelopmentCard} from './development'
import {Resource} from './resources';

export enum PlayerColors {
    BLUE = "blue",
    GREEN = "green",
    ORANGE = "orange",
    RED = "red",
    WHITE = "white",
    NONE = "none",
};

export class Player {
  public readonly id: string;
  public readonly lands: TileCorner [] = [];
  public readonly developmentCards: DevelopmentCard[] = [];
  public readonly resources: Resource[] = [];
  public color: PlayerColors;
  
  constructor(id: string) {
    this.id = id;
  }
}
