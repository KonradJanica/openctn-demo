import {Tile} from './tile'

export class BoardSmall {
  static readonly AmountTiles = 19;

  private readonly tiles: Tile[];

  constructor(players: number) {
    this.tiles = Array(BoardSmall.AmountTiles).fill(new Tile(null));
  }
}
