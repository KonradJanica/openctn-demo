import {TileEdge} from './tile-edge'

export class TileCorner {
  private readonly tileEdges: TileEdge[];

  constructor(edges: TileEdge[]) {
    this.tileEdges= edges;
  }
}
