import {IBoard} from './board-interface';
import {Tile} from './tile'

export class BoardLarge implements IBoard {
  static readonly AmountTiles = 30;

  private readonly tiles: Tile[];

  constructor() {
    this.tiles = Array(BoardLarge.AmountTiles).fill(new Tile(null));
  }

  /** @implements */
  GetTiles() {
    return this.tiles;
  }
}
