import {TileCorner} from './tile-corner'
import {TileEdge} from './tile-edge'
import {IBoard} from './board-interface';
import {Tile, LandTile, TileParams, TileType, TilePlacement, LeftToRight, 
  WaterTileBuilder, CoastTileBuilder} from './tile';
import {Shuffle} from '../util/shuffle';
import Dock, { DockPlacement, DockParams, DockType } from './dock';

const TILE_TYPE_AMOUNT_BRICK = 3;
const TILE_TYPE_AMOUNT_DESERT = 1;
const TILE_TYPE_AMOUNT_GRAIN = 4;
const TILE_TYPE_AMOUNT_LUMBER = 4;
const TILE_TYPE_AMOUNT_ORE = 3;
const TILE_TYPE_AMOUNT_WOOL = 4;

export default class BoardSmall implements IBoard {
  static readonly AmountLandTiles = 19;
  static readonly SpiralTraversalIndices =
   [0, 1, 3, 8, 13, 16, 18, 17, 15, 10, 5, 2, 4, 6, 11, 14, 12, 7, 9]
  static readonly SpiralRollNums =
   [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];

  private readonly tiles: Tile[];
  public readonly waterTiles: Tile[];
  public readonly docks: Dock[];

  constructor() {
    this.tiles = [];
    this.waterTiles = [];
    this.docks = [];
    this.GenerateMap();
    this.PositionTiles();
    this.PositionCorners();
    this.PositionEdges();
    this.GenerateWater();
    this.GenerateDocks();
    this.PositionNumbers();
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
    // Tile graph.
    // Edges and corners in a tile are indexed based on the following rules:
    // Corners: Start from the top left corner, clockwise. [0, 1, 2, 3, 4, 5, 6]
    //         
    //      0-----1
    //     /       \ 
    //   5/         \2
    //    \         /
    //     \       / 
    //      4-----3
    //         
    // Edges: Start from the top edge, clockwise. [0, 1, 2, 3, 4, 5, 6]
    //         0
    //       -----
    //  5  /       \   1
    //    /         \
    //    \         /
    //  4  \       /   2
    //       -----
    //         3
    // This makes it a graph which we can traverse and use for enforcing game rules.
    // The description here uses 0 based index system.
    const tilesPerRow = [1, 2, 3, 2, 3, 2, 3, 2, 1];
    let tileObjsPerRow = [];
    tilesPerRow.forEach((numTiles, rowIndex) => {
      let tilesInRow = [];
      for (let tileIndex = 0; tileIndex < numTiles; tileIndex++) {
        let corners : TileCorner[] = [];
        for (let j = 0; j < 6; j++) {
          // If this is the first row, just create all the corners. First row always has 1 hexagon.
          if (rowIndex == 0) {
            corners.push(new TileCorner());
          }  else {
            // 0-th corner.
            if (j == 0) {
              const prevRowTiles = tileObjsPerRow[rowIndex-1]; 
              if (prevRowTiles.length < numTiles) {
                if (tileIndex == 0) {
                  if (rowIndex > 1 && tileObjsPerRow[rowIndex-2].length == numTiles) {
                    corners.push(tileObjsPerRow[rowIndex-2][tileIndex].corners[4])
                  } else {
                    corners.push(new TileCorner());
                  }
                } else {
                  corners.push(prevRowTiles[tileIndex-1].corners[2]);
                }
              } else if (prevRowTiles.length > numTiles) {
                corners.push(prevRowTiles[tileIndex].corners[2]);
              } else if (prevRowTiles.length == numTiles) {
                console.log('Error: this is not a hexagon array.');
              }
            } else if (j == 1) {
              const prevRowTiles = tileObjsPerRow[rowIndex-1]; 
              if (prevRowTiles.length < numTiles) {
                if (tileIndex == numTiles-1) {
                  if (rowIndex > 1 && tileObjsPerRow[rowIndex-2].length == numTiles) {
                    corners.push(tileObjsPerRow[rowIndex-2][tileIndex].corners[3])
                  } else {
                    corners.push(new TileCorner());
                  }
                } else {
                  corners.push(prevRowTiles[tileIndex].corners[5]);
                }
              } else if (prevRowTiles.length > numTiles) {
                corners.push(prevRowTiles[tileIndex+1].corners[5]);
              } else if (prevRowTiles.length == numTiles) {
                console.log('Error: this is not a hexagon array.');
              }
            } else if (j == 2) {
              const prevRowTiles = tileObjsPerRow[rowIndex-1]; 
              if (prevRowTiles.length < numTiles) {
                if (tileIndex == numTiles-1) {
                  corners.push(new TileCorner());
                } else {
                  corners.push(prevRowTiles[tileIndex].corners[4]);
                }
              } else if (prevRowTiles.length > numTiles) {
                corners.push(prevRowTiles[tileIndex+1].corners[4]);
              } else if (prevRowTiles.length == numTiles) {
                console.log('Error: this is not a hexagon array.');
              }
            } else if (j == 5) {
              const prevRowTiles = tileObjsPerRow[rowIndex-1]; 
              if (prevRowTiles.length < numTiles) {
                if (tileIndex == 0) {
                  corners.push(new TileCorner());
                } else {
                  corners.push(prevRowTiles[tileIndex-1].corners[3]);
                }
              } else if (prevRowTiles.length > numTiles) {
                corners.push(prevRowTiles[tileIndex].corners[3]);
              } else if (prevRowTiles.length == numTiles) {
                console.log('Error: this is not a hexagon array.');
              }
            } else {
              corners.push(new TileCorner());
            }
          }
        }
        console.assert(corners.length == 6, 'Bug, 6 corners per tile.');
          
        const params : TileParams = {
          tileType: availableTiles.pop(),
          tilePlacement: TilePlacement.INLAND,
          cornerList: corners,
          edgeList: []
        }
        const newTile = new LandTile(params);
        this.tiles.push(newTile);
        tilesInRow.push(newTile);
      }
      tileObjsPerRow.push(tilesInRow);
    });

    let edges : TileEdge[] = [];
    // Now that we have tiles with corners, stich the corners to get edges.
    this.tiles.forEach((tile, i) => {
      for (let i = 0; i < 6; i++) {
        let cornerA = tile.corners[i];
        let cornerB = tile.corners[(i + 1) % 6];
        if (cornerA.getEdgeWith(cornerB) == null) {
          let newEdge = new TileEdge(cornerA, cornerB);
          cornerA.edges.push(newEdge);
          cornerB.edges.push(newEdge);
          tile.edges.push(newEdge);
          console.assert(cornerA.getEdgeWith(cornerB) == newEdge, 'Could not add edge!');
        } else {
          tile.edges.push(cornerA.getEdgeWith(cornerB));
        }
      }
      console.assert(tile.edges.length == 6, 'Bug, 6 edges for each tile.');
    });
  }

  private PositionTiles() {
    let yPos = 0;
    let rowEnd = 0;
    let i = 0;
    // Outer array represents rows.
    // Inner array represents: [x start pos, amount of tiles, start placement]
    [[Tile.Width * 1.5, 1, TilePlacement.COAST_TOP],
     [Tile.Width * 0.75, 2, TilePlacement.COAST_TOP_LEFT_2],
     [0, 3, TilePlacement.COAST_TOP_LEFT_3],
     [Tile.Width * 0.75, 2, TilePlacement.INLAND],
     [0, 3, TilePlacement.COAST_LEFT],
     [Tile.Width * 0.75, 2, TilePlacement.INLAND],
     [0, 3, TilePlacement.COAST_BOTTOM_LEFT_3],
     [Tile.Width * 0.75, 2, TilePlacement.COAST_BOTTOM_LEFT_2],
     [Tile.Width * 1.5, 1, TilePlacement.COAST_BOTTOM]].forEach((val) => {
       let xPos = val[0];
       rowEnd += val[1];
       this.tiles[i].tilePlacement = val[2];
       for (; i < rowEnd; ++i) {
         this.tiles[i].xPos = xPos;
         this.tiles[i].yPos = yPos;
         xPos += Tile.Width * 1.5;
       }
       this.tiles[i - 1].tilePlacement = LeftToRight(val[2]);
       yPos += Tile.Height / 2;
     });
  }

  private PositionCorners() {
    // Hardcoded position for each corner.
    let visited : TileCorner[] = [];
    const cornerPos = [
      [25, -25],
      [125, -25],
      [165, 55],
      [125, 125],
      [25, 125],
      [-15, 55],
    ]
    this.tiles.forEach((tile, tileIndex) => {
      tile.corners.forEach((corner, cornerIndex) => {
        if (visited.indexOf(corner) == -1) {
          corner.xPos = cornerPos[cornerIndex][0]
          corner.yPos = cornerPos[cornerIndex][1]
          visited.push(corner);
        }
      });
    });
  }

  private PositionEdges() {
    // Hardcoded position for each corner.
    let visited : TileEdge[] = [];
    const edgePos = [
      [40, -20],
      [150, -10],
      [140, 80],
      [40, 140],
      [0, 70],
      [-5,  -5],
    ]
    this.tiles.forEach((tile, tileIndex) => {
      tile.edges.forEach((edge, edgeIndex) => {
        if (visited.indexOf(edge) == -1) {
          edge.xPos = edgePos[edgeIndex][0]
          edge.yPos = edgePos[edgeIndex][1]
          visited.push(edge);
        }
      });
    });
  }

  private GenerateDocks() {
    const availableTypes = [
      ...Array(4).fill(DockType.ANY),
      DockType.BRICK,
      DockType.GRAIN,
      DockType.LUMBER,
      DockType.ORE,
      DockType.WOOL,
    ];
    Shuffle(availableTypes);
    [{tileIdx:0, dp:DockPlacement.TOP_CENTER},
     {tileIdx:1, dp:DockPlacement.TOP_LEFT},
     {tileIdx:2, dp:DockPlacement.TOP_RIGHT},
     {tileIdx:8, dp:DockPlacement.TOP_LEFT},
     {tileIdx:10, dp:DockPlacement.TOP_RIGHT},
     {tileIdx:13, dp:DockPlacement.BOTTOM_LEFT},
     {tileIdx:15, dp:DockPlacement.BOTTOM_RIGHT},
     {tileIdx:16, dp:DockPlacement.BOTTOM_CENTER},
     {tileIdx:17, dp:DockPlacement.BOTTOM_CENTER}].forEach((val) => {
       const dp : DockParams = {
         tileXPos: this.tiles[val.tileIdx].xPos,
         tileYPos: this.tiles[val.tileIdx].yPos,
         dockPlacement: val.dp,
         dockType: availableTypes.pop(),
       };
       this.docks.push(new Dock(dp));
     });
  }

  private GenerateWater() {
    // Add water tiles
    this.tiles.forEach((val) => {
      this.waterTiles.push.apply(this.waterTiles, WaterTileBuilder(val));
    });

    // Add coast tiles
    this.tiles.forEach((val) => {
      this.waterTiles.push.apply(this.waterTiles, CoastTileBuilder(val));
    });
  }

  private PositionNumbers() {
    let i = 0;
    BoardSmall.SpiralTraversalIndices.forEach((val) => {
      if (this.tiles[val].tileType === TileType.DESERT) {
        this.tiles[val].rollNum = 0;
        return;
      }
      this.tiles[val].rollNum = BoardSmall.SpiralRollNums[i];
      ++i;
    });
  }

  /** @implements */
  GetTiles() {
    return this.tiles;
  }

  /** @implements */
  GetWaterTiles(): Tile[] {
    return this.waterTiles;
  }

  /** @implements */
  GetDocks(): Dock[] {
    return this.docks;
  }
}
