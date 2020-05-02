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
  tileIdx : number;
  edgeId : number;

  readonly State: () => TileEdgeState;
};

export type TileEdgeParams = {
  cornerA : TileCorner,
  cornerB : TileCorner,
  tileIdx : number;
  edgeId : number;
}

export function CreateTileEdge(params: TileEdgeParams) : TileEdge {
  const te = {
    // Game properties.
    a: params.cornerA,
    b: params.cornerB,
    edgeState: {
      edgeType: TileEdgeType.EMPTY,
      owner: null,
    },

    // Render properties.
    xPos: 0,
    yPos: 0,
    color: PlayerColors.NONE,
    tileIdx: params.tileIdx,
    edgeId: params.edgeId,
  };

  return {
    ...te,

    State: () => {
      return Object.assign({}, te.edgeState);
    },
  };
};
