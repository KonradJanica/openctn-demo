import { SET_BOARD, ADD_CORNER } from '../actionTypes'
import { Tile, Dock, TileCorner, TileEdge } from '../../models/models';
import { TileParams, TilePlacement, LeftToRight, WaterTileBuilder, CoastTileBuilder, TileType, TileStatics, CreateTile } from '../../models/tile';
import { DockPlacement, DockParams, DockType } from '../../models/dock';
import { PlayerColors } from '../../models/player';
import { CreateTileCorner } from '../../models/tile-corner';
import { CreateTileEdge } from '../../models/tile-edge';

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

    return {
        ...state,
        tiles,
        waterTiles,
        docks,
    };

    function generateTiles(availableTiles): Tile[] {
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

        const tileLength = 19;
        const cornerBuilder = {
            0: [0, 1, 2, 3, 4, 5],
            1: [6, 5, 4, 7, 8, 9],
            2: [2, 10, 11, 12, 13, 3],
            3: [14, 9, 8, 15, 16, 17],
            4: [4, 3, 13, 18, 19, 7],
            5: [11, 20, 21, 22, 23, 12],
            6: [8, 7, 19, 24, 25, 15],
            7: [13, 12, 23, 26, 27, 18],
            8: [16, 15, 25, 28, 29, 30],
            9: [19, 18, 27, 31, 32, 24],
            10: [23, 22, 33, 34, 35, 26],
            11: [25, 24, 32, 36, 37, 28],
            12: [27, 26, 35, 38, 39, 31],
            13: [29, 28, 37, 40, 41, 42],
            14: [32, 31, 39, 43, 44, 36],
            15: [35, 34, 45, 46, 47, 38],
            16: [37, 36, 44, 48, 49, 40],
            17: [39, 38, 47, 50, 51, 43],
            18: [44, 43, 51, 52, 53, 48],
        }
        const edgeBuilder = {
            0: [0, 1, 2, 3, 4, 5],
            1: [6, 4, 7, 8, 9, 10],
            2: [11, 12, 13, 14, 15, 2],
            3: [16, 15, 17, 18, 19, 20],
            4: [3, 15, 21, 22, 23, 7],
            5: [24, 25, 26, 27, 28, 13],
            6: [8, 23, 29, 30, 31, 17],
            7: [14, 28, 32, 33, 34, 21],
            8: [18, 31, 35, 36, 37, 38],
            9: [22, 34, 39, 40, 41, 29],
            10: [27, 42, 43, 44, 45, 32],
            11: [30, 41, 46, 47, 48, 35],
            12: [33, 45, 49, 50, 51, 46],
            13: [36, 48, 52, 53, 54, 55],
            14: [40, 51, 56, 57, 58, 46],
            15: [44, 59, 60, 61, 62, 49],
            16: [47, 58, 63, 64, 65, 52],
            17: [50, 62, 66, 67, 68, 56],
            18: [57, 68, 69, 70, 71, 63],
        };

        const tiles = [];
        const corners = [];
        const edges = [];
        for (let tileIdx = 0; tileIdx < tileLength; ++tileIdx) {
            cornerBuilder[tileIdx].forEach(function(cornerId) {
                if (corners.length <= cornerId) {
                    corners.push(CreateTileCorner({ tileIdx, cornerId }))
                }
            });
            edgeBuilder[tileIdx].forEach(function(edgeId, i) {
                if (edges.length <= edgeId) {
                    const cornerA = corners[tileIdx][i];
                    const cornerB = corners[tileIdx][(i + 1) % 6]
                    edges.push(CreateTileEdge({ cornerA, cornerB, tileIdx, edgeId }))
                }
            });
            const tileParams : TileParams = {
                tileType: availableTiles.pop(),
                tilePlacement: TilePlacement.INLAND,
                cornerList: cornerBuilder[tileIdx].map((val) => corners[val]),
                edgeList: edgeBuilder[tileIdx].map((val) => edges[val]),
            }
            tiles.push(CreateTile(tileParams))
        }
        return tiles;
    }

    function positionTiles(tiles: Tile[]) {
        let yPos = 0;
        let rowEnd = 0;
        let i = 0;
        // Outer array represents rows.
        // Inner array represents: [x start pos, amount of tiles, start placement]
        [[TileStatics.Width * 1.5, 1, TilePlacement.COAST_TOP],
        [TileStatics.Width * 0.75, 2, TilePlacement.COAST_TOP_LEFT_2],
        [0, 3, TilePlacement.COAST_TOP_LEFT_3],
        [TileStatics.Width * 0.75, 2, TilePlacement.INLAND],
        [0, 3, TilePlacement.COAST_LEFT],
        [TileStatics.Width * 0.75, 2, TilePlacement.INLAND],
        [0, 3, TilePlacement.COAST_BOTTOM_LEFT_3],
        [TileStatics.Width * 0.75, 2, TilePlacement.COAST_BOTTOM_LEFT_2],
        [TileStatics.Width * 1.5, 1, TilePlacement.COAST_BOTTOM]].forEach((val) => {
            let xPos = val[0];
            rowEnd += val[1];
            tiles[i].tilePlacement = val[2];
            for (; i < rowEnd; ++i) {
                tiles[i].xPos = xPos;
                tiles[i].yPos = yPos;
                xPos += TileStatics.Width * 1.5;
            }
            tiles[i - 1].tilePlacement = LeftToRight(val[2]);
            yPos += TileStatics.Height / 2;
        });
    }

    function positionCorners(tiles: Tile[]) {
        // Hardcoded position for each corner.
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
                if (corner.xPos === 0 || corner.yPos === 0) {
                    corner.xPos = cornerPos[cornerIndex][0]
                    corner.yPos = cornerPos[cornerIndex][1]
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
};

handlers[ADD_CORNER] = (state: state, action) : state => {
    state.tiles[action.payload.tileIdx].corners.some(function(val) {
        if (val.cornerId === action.payload.cornerId) {
            val.color = PlayerColors.BLUE;
            return true;
        }
    });
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