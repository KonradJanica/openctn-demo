import {IBoard} from './board-interface';
import {Tile, CreateTile} from './tile'

export class BoardLarge implements IBoard {
  static readonly AmountTiles = 30;

  private readonly tiles: Tile[];

  constructor() {
    this.tiles = Array(BoardLarge.AmountTiles).fill(CreateTile(null));
  }

  /** @implements */
  GetTiles() {
    return this.tiles;
  }

  GetWaterTiles() {
    return [];
  }

  GetDocks() {
    return [];
  }
}
