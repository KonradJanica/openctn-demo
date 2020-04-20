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
  static readonly Width = 40;
  static readonly Height = 40;
  private readonly cornerState: TileCornerState;
  edges: TileEdge[] = [];

  // Render properties.
  public xPos : number;
  public yPos : number;
  public isRendered: boolean;

  constructor() {
    this.cornerState = {
      cornerType: TileCornerType.EMPTY,
      owner: null,
    };
  }

  public getEdgeWith(cornerB: TileCorner) : TileEdge {
    let foundEdge : TileEdge = null;
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
  }

  State(): TileCornerState {
    return Object.assign({}, this.cornerState);
  }
}
