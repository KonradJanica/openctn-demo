import Tile from './tile';

export interface IBoard {
  // TODO: This is enabled for testing. Come up with better API.
  GetTiles(): Tile[];
};