import {Player, PlayerColors} from './player'
import {TileEdge} from './tile-edge'

export enum TileCornerType {
  EMPTY,
  SETTLEMENT,
  CITY
}

export type TileCornerState = {
  cornerType: TileCornerType;
  // Specified if cornerType is SETTLEMENT or CITY
  owner: Player|null;
}

export const TileCornerStatics = {
  Width: 40,
  Height: 40,
};

export type TileCorner = {
  readonly cornerState: TileCornerState;
  edges: TileEdge[];

  // Render properties.
  xPos : number;
  yPos : number;
  color : PlayerColors;

  readonly getEdgeWith: (cornerB: TileCorner) => TileEdge;
  readonly State: () => TileCornerState;
}

export function CreateTileCorner() : TileCorner {
  const tc = {
    cornerState: {
      cornerType: TileCornerType.EMPTY,
      owner: null,
    },
    edges: [],

    xPos: 0,
    yPos: 0,
    color: PlayerColors.NONE,
  };

  return {
    ...tc,

    getEdgeWith: function(cornerB: TileCorner) {
      let foundEdge: TileEdge = null;
      this.edges.forEach((edge, i) => {
        if (edge.a == cornerB || edge.b == cornerB) {
          cornerB.edges.forEach((edgeB, j) => {
            if (edgeB.a == this || edgeB.b == this) {
              console.assert(edge == edgeB, 'Hexagon graph is broken! not bidirectional.');
              console.assert(foundEdge == null, 'Hexagon graph is broken! more than 1 edge between 2 corners!');
              foundEdge = edge;
            }
          });
          console.assert(foundEdge != null, 'Graph is broken! Why is it directional?');
        }
      });
      return foundEdge;
    },

    State: () => {
      return Object.assign({}, tc.cornerState);
    },
  };
}