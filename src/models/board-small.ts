import {TileCorner} from './tile-corner'
import {TileEdge} from './tile-edge'
import {IBoard} from './board-interface';
import {Tile, TileParams, TileType} from './tile';
import {Shuffle} from '../util/shuffle';

const TILE_TYPE_AMOUNT_BRICK = 3;
const TILE_TYPE_AMOUNT_DESERT = 1;
const TILE_TYPE_AMOUNT_GRAIN = 4;
const TILE_TYPE_AMOUNT_LUMBER = 4;
const TILE_TYPE_AMOUNT_ORE = 3;
const TILE_TYPE_AMOUNT_WOOL = 4;

export default class BoardSmall implements IBoard {
  static readonly AmountTiles = 19;

  private readonly tiles: Tile[];

  constructor() {
    this.tiles = [];
    this.GenerateMap();
    this.PositionTiles();
  }

  private GenerateMap() {
    const availableTiles = [
      ...Array(TILE_TYPE_AMOUNT_BRICK).fill(TileType.BRICK),
      ...Array(TILE_TYPE_AMOUNT_DESERT).fill(TileType.DESERT),
      ...Array(TILE_TYPE_AMOUNT_GRAIN).fill(TileType.GRAIN),
      ...Array(TILE_TYPE_AMOUNT_LUMBER).fill(TileType.LUMBER),
      ...Array(TILE_TYPE_AMOUNT_ORE).fill(TileType.ORE),
      ...Array(TILE_TYPE_AMOUNT_WOOL).fill(TileType.WOOL),
    ];
    Shuffle(availableTiles);

    // Hard coded 4v4 map.
    const tilesPerRow = [3, 4, 5, 4, 3];
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
              const prevRowTile = tiles[tiles.length - 1][0];
              corners.push(prevRowTile.corners[(j == 0) ? 4 : 3]);
            } else {
              corners.push(new TileCorner());
            }
          }
          for (let j = 0; j < 6; j++) {
            // 0-th edge is shared with the tile in the previous row (3rd edge).
            if (rowIndex > 0 && j == 0) {
              const prevRowTile = tiles[tiles.length - 1][0];
              edges.push(prevRowTile.edges[3]);
            } else {
              const newEdge = new TileEdge(corners[j], corners[(j == 5) ? 0 : (j+1)]);
              edges.push(newEdge);
              corners[j].tileEdges.push(newEdge);
              corners[(j == 5) ? 0 : (j+1)].tileEdges.push(newEdge);
            }
          }
        } else {
          // Everything else to the right of it shares two corners and an edge with the previous tile.
          const prevTile = this.tiles[this.tiles.length - 1];
          for (let j = 0; j < 6; j++) {
            if (rowIndex > 0 && (j == 0 || j == 1) && (tiles[tiles.length - 1].length < i)) {
              // 0-th and 1st corners are shared with the tile in the previous row (4th and 3rd corners).
              const prevRowTile = tiles[tiles.length - 1][i];
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
              const prevRowTile = tiles[tiles.length - 1][i-1];
              edges.push(prevRowTile.edges[2]);
            } else if (rowIndex > 0 && (j == 0) && (tiles[tiles.length - 1].length < i)) {
              // 0th edge is shared with the 3rd edge of the tile in the previous row (to its left).
              const prevRowTile = tiles[tiles.length - 1][i];
              edges.push(prevRowTile.edges[3]);
            } else if (j == 4) {
              // 4th edge is shared with the 1st of the previous tile.
              edges.push(prevTile.edges[1]);
            } else {
              const newEdge = new TileEdge(corners[j], corners[(j == 5) ? 0 : (j+1)]);
              edges.push(newEdge);
              corners[j].tileEdges.push(newEdge);
              corners[(j == 5) ? 0 : (j+1)].tileEdges.push(newEdge);
            }
          }
        }
        const params : TileParams = {
          // TODO: Fix tile type.
          tileType: availableTiles.pop(),
          cornerList: corners,
          edgeList: edges
        }
        const newTile = new Tile(params);
        this.tiles.push(newTile);
        tilesInRow.push(newTile);
      }
      tiles.push(tilesInRow);
    });
  }

  private PositionTiles() {
    let yPos = 0;
    let rowEnd = 0;
    let i = 0;
    // Outer array represents rows.
    // Inner array represents: [x start pos, amount of tiles]
    [[Tile.Width * 1.5, 1],
     [Tile.Width * 0.75, 2],
     [0, 3],
     [Tile.Width * 0.75, 2],
     [0, 3],
     [Tile.Width * 0.75, 2],
     [0, 3],
     [Tile.Width * 0.75, 2],
     [Tile.Width * 1.5, 1]].forEach((val) => {
       let xPos = val[0];
       rowEnd += val[1];
       for (; i < rowEnd; ++i) {
         this.tiles[i].xPos = xPos;
         this.tiles[i].yPos = yPos;
         xPos += Tile.Width * 1.5;
       }
       yPos += Tile.Height / 2;
     });
  }

  /** @implements */
  GetTiles() {
    return this.tiles;
  }
}