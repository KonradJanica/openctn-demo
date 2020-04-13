import {TileCorner} from './tile-corner';
import {TileEdge} from './tile-edge';

export enum TileType {
  DESERT,
  GRAIN,
  LUMBER,
  WOOL,
  ORE,
  BRICK,
}

export class Tile {
  static readonly Height = 50;
  static readonly Width = 50;

  // Game properties.
  readonly tileType : TileType;
  private tileCornerList : TileCorner[];
  private tileEdgeList : TileEdge[];

  // Render properties.
  public xPos : number;
  public yPos : number;

  constructor(tileType: TileType) {
    this.tileType = tileType;
    this.tileCornerList.fill
    // this.tileType = tileParams.tileType;
    // this.landList = tileParams.landList; 
  }
};
