import {Player} from './player'
import {TileCorner} from './tile-corner';

export enum TileEdgeType {
  EMPTY,
  ROAD
}

export interface TileEdgeState {
  edgeType: TileEdgeType;
  // Specified if cornerType is ROAD.
  owner: Player|null;
}

export class TileEdge {
  // Game properties.
  readonly a: TileCorner;
  readonly b: TileCorner;
  readonly edgeState: TileEdgeState;

  // Render properties.
  public xPos : number;
  public yPos : number;
  public isRendered: boolean;

  constructor(cornerA: TileCorner, cornerB: TileCorner) {
    this.a = cornerA;
    this.b = cornerB;
    this.edgeState = {
      edgeType: TileEdgeType.EMPTY,
      owner: null,
    };
    this.isRendered = true;
  }

  State(): TileEdgeState {
    return Object.assign({}, this.edgeState);
  }
};
