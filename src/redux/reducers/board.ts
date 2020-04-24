import { SET_BOARD, ADD_CORNER } from '../actionTypes'
import { Tile, Dock, TileCorner, TileEdge } from '../../models/models';
import { TileParams, LandTile, TilePlacement, LeftToRight, WaterTileBuilder, CoastTileBuilder, TileType } from '../../models/tile';
import { DockPlacement, DockParams, DockType } from '../../models/dock';
import { PlayerColors } from '../../models/player';

interface state {
  tiles: Tile[];
  waterTiles: Tile[];
  docks: Dock[];
}

const initialState : state = {
    tiles: [],
    waterTiles: [],
    docks: [],
}

const handlers = {};
handlers[SET_BOARD] = (state: state, action): state => {
    const { availableTiles, availableDockTypes } = action.payload;
    const tiles = generateTiles(availableTiles);
    positionTiles(tiles);
    positionCorners(tiles);
    positionEdges(tiles);
    const docks = generateDocks(tiles, availableDockTypes);
    const waterTiles = generateWater(tiles);
    positionNumbers(tiles);

    function generateTiles(availableTiles) : Tile[] {
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
        const tiles = [];
        const tilesPerRow = [1, 2, 3, 2, 3, 2, 3, 2, 1];
        let tileObjsPerRow = [];
        tilesPerRow.forEach((numTiles, rowIndex) => {
            let tilesInRow = [];
            for (let tileIndex = 0; tileIndex < numTiles; tileIndex++) {
                let corners: TileCorner[] = [];
                for (let j = 0; j < 6; j++) {
                    // If this is the first row, just create all the corners. First row always has 1 hexagon.
                    if (rowIndex == 0) {
                        corners.push(new TileCorner());
                    } else {
                        // 0-th corner.
                        if (j == 0) {
                            const prevRowTiles = tileObjsPerRow[rowIndex - 1];
                            if (prevRowTiles.length < numTiles) {
                                if (tileIndex == 0) {
                                    if (rowIndex > 1 && tileObjsPerRow[rowIndex - 2].length == numTiles) {
                                        corners.push(tileObjsPerRow[rowIndex - 2][tileIndex].corners[4])
                                    } else {
                                        corners.push(new TileCorner());
                                    }
                                } else {
                                    corners.push(prevRowTiles[tileIndex - 1].corners[2]);
                                }
                            } else if (prevRowTiles.length > numTiles) {
                                corners.push(prevRowTiles[tileIndex].corners[2]);
                            } else if (prevRowTiles.length == numTiles) {
                                console.log('Error: this is not a hexagon array.');
                            }
                        } else if (j == 1) {
                            const prevRowTiles = tileObjsPerRow[rowIndex - 1];
                            if (prevRowTiles.length < numTiles) {
                                if (tileIndex == numTiles - 1) {
                                    if (rowIndex > 1 && tileObjsPerRow[rowIndex - 2].length == numTiles) {
                                        corners.push(tileObjsPerRow[rowIndex - 2][tileIndex].corners[3])
                                    } else {
                                        corners.push(new TileCorner());
                                    }
                                } else {
                                    corners.push(prevRowTiles[tileIndex].corners[5]);
                                }
                            } else if (prevRowTiles.length > numTiles) {
                                corners.push(prevRowTiles[tileIndex + 1].corners[5]);
                            } else if (prevRowTiles.length == numTiles) {
                                console.log('Error: this is not a hexagon array.');
                            }
                        } else if (j == 2) {
                            const prevRowTiles = tileObjsPerRow[rowIndex - 1];
                            if (prevRowTiles.length < numTiles) {
                                if (tileIndex == numTiles - 1) {
                                    corners.push(new TileCorner());
                                } else {
                                    corners.push(prevRowTiles[tileIndex].corners[4]);
                                }
                            } else if (prevRowTiles.length > numTiles) {
                                corners.push(prevRowTiles[tileIndex + 1].corners[4]);
                            } else if (prevRowTiles.length == numTiles) {
                                console.log('Error: this is not a hexagon array.');
                            }
                        } else if (j == 5) {
                            const prevRowTiles = tileObjsPerRow[rowIndex - 1];
                            if (prevRowTiles.length < numTiles) {
                                if (tileIndex == 0) {
                                    corners.push(new TileCorner());
                                } else {
                                    corners.push(prevRowTiles[tileIndex - 1].corners[3]);
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

                const params: TileParams = {
                    tileType: availableTiles.pop(),
                    tilePlacement: TilePlacement.INLAND,
                    cornerList: corners,
                    edgeList: []
                }
                const newTile = new LandTile(params);
                tiles.push(newTile);
                tilesInRow.push(newTile);
            }
            tileObjsPerRow.push(tilesInRow);
        });

        let edges: TileEdge[] = [];
        // Now that we have tiles with corners, stich the corners to get edges.
        tiles.forEach((tile, i) => {
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

        return tiles;
    }

    function positionTiles(tiles: Tile[]) {
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
            tiles[i].tilePlacement = val[2];
            for (; i < rowEnd; ++i) {
                tiles[i].xPos = xPos;
                tiles[i].yPos = yPos;
                xPos += Tile.Width * 1.5;
            }
            tiles[i - 1].tilePlacement = LeftToRight(val[2]);
            yPos += Tile.Height / 2;
        });
    }

    function positionCorners(tiles: Tile[]) {
        // Hardcoded position for each corner.
        let visited: TileCorner[] = [];
        const cornerPos = [
            [25, -25],
            [125, -25],
            [165, 55],
            [125, 125],
            [25, 125],
            [-15, 55],
        ]
        tiles.forEach((tile, tileIndex) => {
            tile.corners.forEach((corner, cornerIndex) => {
                if (visited.indexOf(corner) == -1) {
                    corner.xPos = cornerPos[cornerIndex][0]
                    corner.yPos = cornerPos[cornerIndex][1]
                    visited.push(corner);
                }
            });
        });
    }

    function positionEdges(tiles: Tile[]) {
        // Hardcoded position for each corner.
        let visited: TileEdge[] = [];
        const edgePos = [
            [40, -20],
            [150, -10],
            [140, 80],
            [40, 140],
            [0, 70],
            [-5, -5],
        ]
        tiles.forEach((tile, tileIndex) => {
            tile.edges.forEach((edge, edgeIndex) => {
                if (visited.indexOf(edge) == -1) {
                    edge.xPos = edgePos[edgeIndex][0]
                    edge.yPos = edgePos[edgeIndex][1]
                    visited.push(edge);
                }
            });
        });
    }

    function generateDocks(tiles: Tile[], availableDockTypes: DockType[]) : Dock[] {
        const docks = [];
        [{ tileIdx: 0, dp: DockPlacement.TOP_CENTER },
        { tileIdx: 1, dp: DockPlacement.TOP_LEFT },
        { tileIdx: 2, dp: DockPlacement.TOP_RIGHT },
        { tileIdx: 8, dp: DockPlacement.TOP_LEFT },
        { tileIdx: 10, dp: DockPlacement.TOP_RIGHT },
        { tileIdx: 13, dp: DockPlacement.BOTTOM_LEFT },
        { tileIdx: 15, dp: DockPlacement.BOTTOM_RIGHT },
        { tileIdx: 16, dp: DockPlacement.BOTTOM_CENTER },
        { tileIdx: 17, dp: DockPlacement.BOTTOM_CENTER }].forEach((val) => {
            const dp: DockParams = {
                tileXPos: tiles[val.tileIdx].xPos,
                tileYPos: tiles[val.tileIdx].yPos,
                dockPlacement: val.dp,
                dockType: availableDockTypes.pop(),
            };
            docks.push(new Dock(dp));
        });

        return docks;
    }

    function generateWater(tiles: Tile[]): Tile[] {
        const waterTiles = [];

        // Add water tiles
        tiles.forEach((val) => {
            waterTiles.push.apply(waterTiles, WaterTileBuilder(val));
        });

        // Add coast tiles
        tiles.forEach((val) => {
            waterTiles.push.apply(waterTiles, CoastTileBuilder(val));
        });

        return waterTiles;
    }

    function positionNumbers(tiles: Tile[]) {
        const spiralTraversalIndices =
            [0, 1, 3, 8, 13, 16, 18, 17, 15, 10, 5, 2, 4, 6, 11, 14, 12, 7, 9]
        const spiralRollNums =
            [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
        let i = 0;
        spiralTraversalIndices.forEach((val) => {
            if (tiles[val].tileType === TileType.DESERT) {
                tiles[val].rollNum = 0;
                return;
            }
            tiles[val].rollNum = spiralRollNums[i];
            ++i;
        });
    }

    return {
        ...state,
        tiles,
        waterTiles,
        docks,
    };
};

handlers[ADD_CORNER] = (state: state, action) : state => {
    state.tiles[action.payload.tileIdx].corners[action.payload.cornerIdx].color = PlayerColors.BLUE;
    return {
        ...state,
    };
};

export default function(state = initialState, action) {
    const handler = handlers[action.type];
    if (handler) {
        return handler(state, action);
    }
    return state;
}