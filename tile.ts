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
  readonly tileType : TileType;
  private readonly landList : Land[];

  constructor(tileParams: TileParams) {
    this.tileType = tileParams.tileType;
    this.landList = tileParams.landList; 
  }
};