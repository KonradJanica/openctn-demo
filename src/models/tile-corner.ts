import {Player} from './player'
import {TileEdge} from './tile-edge'

export enum TileCornerType {
  EMPTY,
  SETTLEMENT,
  CITY
}

export interface TileCornerState {
  cornerType: TileCornerType;
  // Specified if cornerType is SETTLEMENT or CITY
  owner: Player|null;
}

export class TileCorner {
  private readonly cornerState: TileCornerState;
  tileEdges: TileEdge[] = [];

  constructor() {
    this.cornerState = {
      cornerType: TileCornerType.EMPTY,
      owner: null,
    };
  }

  State(): TileCornerState {
    return Object.assign({}, this.cornerState);
  }
}
