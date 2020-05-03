import {TileCorner} from './tile-corner';
import {TileEdge} from './tile-edge';
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

export type Player = {
  readonly id: string;
  readonly lands: TileCorner[];
  readonly roads: TileEdge[];
  readonly developmentCards: DevelopmentCard[];
  readonly resources: Resource[];
  color: PlayerColors;
};

export function CreatePlayer(id: string) : Player {
  return {
    id,
    lands: [],
    roads: [],
    developmentCards: [],
    resources: [],
    color: PlayerColors.NONE,
  };
}
