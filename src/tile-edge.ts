import {TileCorner} from './tile-corner';

export class TileEdge {
  private readonly a: TileCorner;
  private readonly b: TileCorner;

  constructor(cornerA: TileCorner, cornerB: TileCorner) {
    this.a = cornerA;
    this.b = cornerB;
  }
};
