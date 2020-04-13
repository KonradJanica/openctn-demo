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
  private readonly tileEdges: TileEdge[];

  constructor(edges: TileEdge[]) {
    this.tileEdges= edges;
  }

  State(): TileCornerState {
    return Object.assign({}, this.cornerState);
  }
}
