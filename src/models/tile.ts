import {TileCorner} from './tile-corner';
import {TileEdge} from './tile-edge';
import {assert} from '../util/error';
import Dock, { DockPlacement } from './dock';

export enum TileType {
  DESERT = "RES_desert",
  GRAIN = "RES_grain",
  LUMBER = "RES_lumber",
  WOOL = "RES_wool",
  ORE = "RES_ore",
  BRICK = "RES_brick",
  WATER = "RES_water",
  COAST_BOTTOM_CENTER = "COAST_bottom_center",
  COAST_BOTTOM_LEFT = "COAST_bottom_left",
  COAST_BOTTOM_RIGHT = "COAST_bottom_right",
  COAST_TOP_CENTER = "COAST_top_center",
  COAST_TOP_LEFT = "COAST_top_left",
  COAST_TOP_RIGHT = "COAST_top_right",
}

export enum TilePlacement {
  COAST_TOP,
  COAST_TOP_LEFT_2,
  COAST_TOP_LEFT_3,
  COAST_TOP_RIGHT_2,
  COAST_TOP_RIGHT_3,
  COAST_LEFT,
  COAST_BOTTOM,
  COAST_BOTTOM_LEFT_2,
  COAST_BOTTOM_LEFT_3,
  COAST_BOTTOM_RIGHT_2,
  COAST_BOTTOM_RIGHT_3,
  COAST_RIGHT,
  INLAND,
  WATER,
}

export function LeftToRight(t: TilePlacement) : TilePlacement {
  switch(t) {
    case TilePlacement.COAST_TOP_LEFT_2:
      return TilePlacement.COAST_TOP_RIGHT_2;
    case TilePlacement.COAST_TOP_LEFT_3:
      return TilePlacement.COAST_TOP_RIGHT_3;
    case TilePlacement.COAST_BOTTOM:
      return TilePlacement.COAST_BOTTOM;
    case TilePlacement.COAST_BOTTOM_LEFT_2:
      return TilePlacement.COAST_BOTTOM_RIGHT_2;
    case TilePlacement.COAST_BOTTOM_LEFT_3:
      return TilePlacement.COAST_BOTTOM_RIGHT_3;
    case TilePlacement.COAST_LEFT:
      return TilePlacement.COAST_RIGHT;
    case TilePlacement.COAST_RIGHT:
      return TilePlacement.COAST_LEFT;
    default:
      return t;
  }
}

export function WaterTileBuilder(t: Tile) : Tile[] {
  var topCenter = CreateWaterTile(t.xPos, t.yPos - TileStatics.Height - 3)
  var topCenterLeft = CreateWaterTile(t.xPos - 2, t.yPos - TileStatics.Height - 3)
  var topCenterRight = CreateWaterTile(t.xPos + 2, t.yPos - TileStatics.Height - 3)
  var topLeft = CreateWaterTile(t.xPos - TileStatics.Width * 0.75 - 4, t.yPos - TileStatics.Height / 2)
  var topRight = CreateWaterTile(t.xPos + TileStatics.Width * 0.75 + 4, t.yPos - TileStatics.Height / 2 - 1)
  var bottomCenter = CreateWaterTile(t.xPos, t.yPos + TileStatics.Height + 3)
  var bottomCenterLeft = CreateWaterTile(t.xPos - 2, t.yPos + TileStatics.Height + 3)
  var bottomCenterRight = CreateWaterTile(t.xPos + 2, t.yPos + TileStatics.Height + 3)
  var bottomLeft = CreateWaterTile(t.xPos - TileStatics.Width * 0.75 - 3, t.yPos + TileStatics.Height / 2 + 2)
  var bottomRight = CreateWaterTile(t.xPos + TileStatics.Width * 0.75 + 3, t.yPos + TileStatics.Height / 2 + 1)

  const res = [];
  switch(t.tilePlacement) {
    case TilePlacement.COAST_TOP: {
      res.push(topCenter);
      break;
    }
    case TilePlacement.COAST_TOP_LEFT_2: {
      res.push(topCenterLeft);
      break;
    }
    case TilePlacement.COAST_TOP_RIGHT_2: {
      res.push(topCenterRight);
      break;
    }
    case TilePlacement.COAST_TOP_LEFT_3: {
      res.push(topCenterLeft);
      res.push(topLeft);
      break;
    }
    case TilePlacement.COAST_TOP_RIGHT_3: {
      res.push(topCenterRight);
      res.push(topRight);
      break;
    }
    case TilePlacement.COAST_LEFT: {
      res.push(topLeft);
      break;
    }
    case TilePlacement.COAST_BOTTOM: {
      res.push(bottomCenter);
      break;
    }
    case TilePlacement.COAST_BOTTOM_LEFT_2: {
      res.push(bottomCenterLeft);
      break;
    }
    case TilePlacement.COAST_BOTTOM_RIGHT_2: {
      res.push(bottomCenterRight);
      break;
    }
    case TilePlacement.COAST_BOTTOM_LEFT_3: {
      res.push(topLeft);
      res.push(bottomCenterLeft);
      res.push(bottomLeft);
      break;
    }
    case TilePlacement.COAST_BOTTOM_RIGHT_3: {
      res.push(topRight);
      res.push(bottomCenterRight);
      res.push(bottomRight);
      break;
    }
    case TilePlacement.COAST_RIGHT: {
      res.push(topRight);
      break;
    } 
  }
  return res;
}

export function CoastTileBuilder(t: Tile) : Tile[] {
  var topCenter =  CreateCoastTile(t.xPos + TileStatics.Width / 4 + 1, t.yPos - TileStatics.Height / 4, 
                                 TileType.COAST_TOP_CENTER)
  var topLeft = CreateCoastTile(t.xPos - 20, t.yPos - 1, 
                              TileType.COAST_TOP_LEFT)
  var topRight = CreateCoastTile(t.xPos + TileStatics.Width * 0.75 + 1, t.yPos, 
                               TileType.COAST_TOP_RIGHT)
  var bottomCenter =  CreateCoastTile(t.xPos + TileStatics.Width / 4, t.yPos + TileStatics.Height + 3, 
                                 TileType.COAST_BOTTOM_CENTER)
  var bottomLeft = CreateCoastTile(t.xPos - 19, t.yPos + TileStatics.Height / 2 + 2, 
                              TileType.COAST_BOTTOM_LEFT)
  var bottomRight = CreateCoastTile(t.xPos + TileStatics.Width * 0.75, t.yPos + TileStatics.Height / 2 + 2, 
                               TileType.COAST_BOTTOM_RIGHT)

  const res = [];
  switch(t.tilePlacement) {
    case TilePlacement.COAST_TOP: {
      res.push(topCenter);
      res.push(topLeft);
      res.push(topRight);
      break;
    }
    case TilePlacement.COAST_TOP_LEFT_2: {
      res.push(topCenter);
      res.push(topLeft);
      break;
    }
    case TilePlacement.COAST_TOP_RIGHT_2: {
      res.push(topCenter);
      res.push(topRight);
      break;
    }
    case TilePlacement.COAST_TOP_LEFT_3: {
      res.push(topCenter);
      res.push(topLeft);
      res.push(bottomLeft);
      break;
    }
    case TilePlacement.COAST_TOP_RIGHT_3: {
      res.push(topCenter);
      res.push(topRight);
      res.push(bottomRight);
      break;
    }
    case TilePlacement.COAST_LEFT: {
      res.push(topLeft);
      res.push(bottomLeft);
      break;
    }
    case TilePlacement.COAST_BOTTOM: {
      res.push(bottomLeft);
      res.push(bottomRight);
      res.push(bottomCenter);
      break;
    }
    case TilePlacement.COAST_BOTTOM_LEFT_2: {
      res.push(bottomLeft);
      res.push(bottomCenter);
      break;
    }
    case TilePlacement.COAST_BOTTOM_RIGHT_2: {
      res.push(bottomCenter);
      res.push(bottomRight);
      break;
    }
    case TilePlacement.COAST_BOTTOM_LEFT_3: {
      res.push(topLeft);
      res.push(bottomLeft);
      res.push(bottomCenter);
      break;
    }
    case TilePlacement.COAST_BOTTOM_RIGHT_3: {
      res.push(topRight);
      res.push(bottomRight);
      res.push(bottomCenter);
      break;
    }
    case TilePlacement.COAST_RIGHT: {
      res.push(topRight);
      res.push(bottomRight);
      break;
    } 
  }
  return res;
}

export interface TileParams {
  tileType: TileType;
  tilePlacement: TilePlacement;
  cornerList: TileCorner[];
  edgeList: TileEdge[];
}

export const TileStatics = {
  Height: 158,
  Width: 188,
  RollNumHeight: 54,
  RollNumWidth: 54,
};

export type Tile = {
  // Game properties.
  readonly tileType : TileType;
  corners: TileCorner[];
  edges: TileEdge[];

  // Render properties.
  height : number;
  width : number;
  xPos : number;
  yPos : number;
  tilePlacement : TilePlacement;
  rollNum : number;
};

export function CreateTile(params: TileParams) : Tile {
  return {
    // Game properties.
    tileType: params.tileType,
    corners: [],
    edges: [],

    // Render properties.
    height: TileStatics.Height,
    width: TileStatics.Width,
    xPos: 0,
    yPos: 0,
    tilePlacement: params.tilePlacement,
    rollNum: 0,
  };
}

export function CreateLandTile(params: TileParams) : Tile {
  return {
    ...CreateTile(params),
    corners: params.cornerList,
    edges: params.edgeList,
  };
};

export function CreateWaterTile(xPos: number, yPos: number) : Tile {
  const params: TileParams = {
    tileType: TileType.WATER,
    tilePlacement: TilePlacement.WATER,
    cornerList: null,
    edgeList: null,
  }
    
  return {
    ...CreateTile(params),
    xPos,
    yPos,
  };
};

export function CreateCoastTile(xPos: number, yPos: number, tileType: TileType) : Tile {
  const params: TileParams = {
    tileType: tileType,
    tilePlacement: TilePlacement.WATER,
    cornerList: null,
    edgeList: null,
  }

  let height;
  let width;
  switch (tileType) {
    case TileType.COAST_BOTTOM_CENTER:
      height = 37
      width = 93
      break;
    case TileType.COAST_BOTTOM_LEFT:
      height = 78
      width = 65
      break;
    case TileType.COAST_BOTTOM_RIGHT:
      height = 79
      width = 66
      break;
    case TileType.COAST_TOP_CENTER:
      height = 37
      width = 92
      break;
    case TileType.COAST_TOP_LEFT:
      height = 79
      width = 65
      break;
    case TileType.COAST_TOP_RIGHT:
      height = 77
      width = 67
      break;
  }

  return {
    ...CreateTile(params),
    xPos,
    yPos,
    height,
    width,
    };
};
