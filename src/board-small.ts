import {IBoard} from './board-interface';
import {TileType, TileParams, Tile} from './tile'
import {TileEdge} from './tile-edge'
import {TileCorner} from './tile-corner'

export class BoardSmall implements IBoard {
  static readonly AmountTiles = 19;

  private readonly tiles: Tile[];

  constructor() {
    this.tiles = [];
    this.generateMap();
    this.positionTiles();
  }

  generateMap() {
    // Hard coded 4v4 map.
    let tilesPerRow = [3, 4, 5, 4, 3];
    let tiles = [];
    tilesPerRow.forEach((numTiles, rowIndex) => {
      let tilesInRow = [];
      for (let i = 0; i < numTiles; i++) {
        let edges : TileEdge[] = [];
        let corners : TileCorner[] = [];
        // Create new edges and corners for the [rowIndex, 0] tile.
        if (i == 0) {
          for (let j = 0; j < 6; j++) {
            // 0-th and 1st corners are shared with the tile in the previous row (4th and 3rd corners).
            if (rowIndex > 0 && (j == 0 || j == 1)) {
              let prevRowTile = tiles[tiles.length - 1][0];
              corners.push(prevRowTile.corners[(j == 0) ? 4 : 3]);
            } else {
              corners.push(new TileCorner());
            }
          }
          for (let j = 0; j < 6; j++) {
            // 0-th edge is shared with the tile in the previous row (3rd edge).
            if (rowIndex > 0 && j == 0) {
              let prevRowTile = tiles[tiles.length - 1][0];
              edges.push(prevRowTile.edges[3]);
            } else {
              let newEdge = new TileEdge(corners[j], corners[(j == 5) ? 0 : (j+1)]);
              edges.push(newEdge);
              corners[j].tileEdges.push(newEdge);
              corners[(j == 5) ? 0 : (j+1)].tileEdges.push(newEdge);
            }
          }
        } else {
          // Everything else to the right of it shares two corners and an edge with the previous tile.
          let prevTile = this.tiles[this.tiles.length - 1];
          for (let j = 0; j < 6; j++) {
            if (rowIndex > 0 && (j == 0 || j == 1) && (tiles[tiles.length - 1].length < i)) {
              // 0-th and 1st corners are shared with the tile in the previous row (4th and 3rd corners).
              let prevRowTile = tiles[tiles.length - 1][i];
              corners.push(prevRowTile.corners[(j == 0) ? 4 : 3]);
            } else if (j == 5) {
              // 1st corner of previous tile is shared with 5th corner of the new tile.
              corners.push(prevTile.corners[1]);
            } else if (j == 4) {
              // 2nd corner of previous tile is shared with 4th corner of the new tile.
              corners.push(prevTile.corners[2]);
            } else {
              corners.push(new TileCorner());
            }
          }

          // Similarly 1st edge of the new tile is shared with 4th edge of the new tile.
          for (let j = 0; j < 6; j++) {
            if (rowIndex > 0 && (j == 5)) {
              // 5th edge is shared with the 2nd edge of the tile in the previous row (to its right).
              let prevRowTile = tiles[tiles.length - 1][i-1];
              edges.push(prevRowTile.edges[2]);
            } else if (rowIndex > 0 && (j == 0) && (tiles[tiles.length - 1].length < i)) {
              // 0th edge is shared with the 3rd edge of the tile in the previous row (to its left).
              let prevRowTile = tiles[tiles.length - 1][i];
              edges.push(prevRowTile.edges[3]);
            } else if (j == 4) {
              // 4th edge is shared with the 1st of the previous tile.
              edges.push(prevTile.edges[1]);
            } else {
              let newEdge = new TileEdge(corners[j], corners[(j == 5) ? 0 : (j+1)]);
              edges.push(newEdge);
              corners[j].tileEdges.push(newEdge);
              corners[(j == 5) ? 0 : (j+1)].tileEdges.push(newEdge);
            }
          }
        }
        let params : TileParams = {
          // TODO: Fix tile type.
          tileType: TileType.DESERT,
          cornerList: corners,
          edgeList : edges,
        }
        let newTile = new Tile(params);
        this.tiles.push(newTile);
        tilesInRow.push(newTile);
      }
      tiles.push(tilesInRow);
    });
  }

  positionTiles() {
    let yPos = 0;
    let rowEnd = 0;
    let i = 0;
    [[Tile.Width, 3],
     [Tile.Width / 2, 4],
     [0, 5],
     [Tile.Width / 2, 4],
     [Tile.Width, 3]].forEach((val) => {
       let xPos = val[0];
       rowEnd += val[1];
       for (; i < rowEnd; ++i) {
         this.tiles[i].xPos = xPos;
         this.tiles[i].yPos = yPos;
         xPos += Tile.Width;
       }
       yPos += Tile.Height;
     });
  }

  render() {
    return this.tiles.map(function (val, i) {
      return `<div style="position:absolute;top:${val.yPos}px;left:${val.xPos}px;">
        ${i}
      </div>`;
    }).join("");
  }

  /** @implements */
  GetTiles() {
    return this.tiles;
  }
}
