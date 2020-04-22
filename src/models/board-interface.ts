import { Tile, WaterTile } from './tile';
import { Dock } from './models';

export interface IBoard {
  // TODO: This is enabled for testing. Come up with better API.
  GetTiles(): Tile[];
  GetWaterTiles(): Tile[];
  GetDocks(): Dock[];
};