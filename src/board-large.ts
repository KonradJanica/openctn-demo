import {Tile} from './tile'

export class BoardLarge {
  static readonly AmountTiles = 30;

  private readonly tiles: Tile[];

  constructor() {
    this.tiles = Array(BoardLarge.AmountTiles).fill(new Tile(null));
  }
}
