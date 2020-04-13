import {Land} from './land';

export enum TileType {
  DESERT,
  GRAIN,
  LUMBER,
  WOOL,
  ORE,
  BRICK,
}

export interface TileParams {
  tileType: TileType;
  landList: Land[];
}

export class Tile {
  static readonly Height = 50;
  static readonly Width = 50;

  readonly tileType : TileType;
  private readonly landList : Land[];

  public xPos : number;
  public yPos : number;

  constructor(tileParams: TileParams) {
    // this.tileType = tileParams.tileType;
    // this.landList = tileParams.landList; 
  }
};
