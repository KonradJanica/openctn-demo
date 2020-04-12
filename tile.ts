export enum TileType {
  DESERT,
  GRAIN,
  LUMBER,
  WOOL,
  ORE,
  BRICK,
}

export class Tile {
  readonly tileType : TileType;

  constructor(tileType : TileType) {
    this.tileType = tileType;
  }


};