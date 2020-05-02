import {Player, PlayerColors} from './player'
import {TileCorner, CreateTileCorner} from './tile-corner';

export enum TileEdgeType {
  EMPTY,
  ROAD
}

export interface TileEdgeState {
  edgeType: TileEdgeType;
  // Specified if cornerType is ROAD.
  owner: Player|null;
}

export type TileEdge = {
  // Game properties.
  readonly a: TileCorner;
  readonly b: TileCorner;
  readonly edgeState: TileEdgeState;

  // Render properties.
  xPos : number;
  yPos : number;
  color : PlayerColors;

  readonly State: () => TileEdgeState;
};


export function CreateTileEdge(cornerA: TileCorner, cornerB: TileCorner) : TileEdge {
  const te = {
    // Game properties.
    a: cornerA,
    b: cornerB,
    edgeState: {
      edgeType: TileEdgeType.EMPTY,
      owner: null,
    },

    // Render properties.
    xPos: 0,
    yPos: 0,
    color: PlayerColors.NONE,
  };

  return {
    ...te,

    State: () => {
      return Object.assign({}, te.edgeState);
    },
  };
};
