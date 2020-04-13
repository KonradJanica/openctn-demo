import {TileCorner} from './tile-corner';
import {TileEdge} from './tile-edge';
import {assert} from '../util/error';

export enum TileType {
  DESERT = "desert",
  GRAIN = "grain",
  LUMBER = "lumber",
  WOOL = "wool",
  ORE = "ore",
  BRICK = "brick",
}

export interface TileParams {
  tileType: TileType;
  cornerList: TileCorner[];
  edgeList: TileEdge[];
}

export class Tile {
  static readonly Height = 158;
  static readonly Width = 188;

  // Game properties.
  readonly tileType : TileType;
  readonly corners: TileCorner[];
  readonly edges: TileEdge[];

  // Render properties.
  public xPos : number;
  public yPos : number;

  constructor(params: TileParams) {
    this.tileType = params.tileType;
    assert(params.cornerList.length == 6, "Number of corners must be 6.")
    assert(params.edgeList.length == 6, "Number of edges must be 6.")
    this.corners = params.cornerList;
    this.edges = params.edgeList;
  }
};