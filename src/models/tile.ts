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
  var topCenter = new WaterTile(t.xPos, t.yPos - Tile.Height - 3)
  var topCenterLeft = new WaterTile(t.xPos - 2, t.yPos - Tile.Height - 3)
  var topCenterRight = new WaterTile(t.xPos + 2, t.yPos - Tile.Height - 3)
  var topLeft = new WaterTile(t.xPos - Tile.Width * 0.75 - 4, t.yPos - Tile.Height / 2)
  var topRight = new WaterTile(t.xPos + Tile.Width * 0.75 + 4, t.yPos - Tile.Height / 2 - 1)
  var bottomCenter = new WaterTile(t.xPos, t.yPos + Tile.Height + 3)
  var bottomCenterLeft = new WaterTile(t.xPos - 2, t.yPos + Tile.Height + 3)
  var bottomCenterRight = new WaterTile(t.xPos + 2, t.yPos + Tile.Height + 3)
  var bottomLeft = new WaterTile(t.xPos - Tile.Width * 0.75 - 3, t.yPos + Tile.Height / 2 + 2)
  var bottomRight = new WaterTile(t.xPos + Tile.Width * 0.75 + 3, t.yPos + Tile.Height / 2 + 1)

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
  var topCenter =  new CoastTile(t.xPos + Tile.Width / 4 + 1, t.yPos - Tile.Height / 4, 
                                 TileType.COAST_TOP_CENTER)
  var topLeft = new CoastTile(t.xPos - 20, t.yPos - 1, 
                              TileType.COAST_TOP_LEFT)
  var topRight = new CoastTile(t.xPos + Tile.Width * 0.75 + 1, t.yPos, 
                               TileType.COAST_TOP_RIGHT)
  var bottomCenter =  new CoastTile(t.xPos + Tile.Width / 4, t.yPos + Tile.Height + 3, 
                                 TileType.COAST_BOTTOM_CENTER)
  var bottomLeft = new CoastTile(t.xPos - 19, t.yPos + Tile.Height / 2 + 2, 
                              TileType.COAST_BOTTOM_LEFT)
  var bottomRight = new CoastTile(t.xPos + Tile.Width * 0.75, t.yPos + Tile.Height / 2 + 2, 
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

export class Tile {
  static readonly Height = 158;
  static readonly Width = 188;
  static readonly RollNumHeight = 54;
  static readonly RollNumWidth = 54;

  // Game properties.
  readonly tileType : TileType;
  corners: TileCorner[];
  edges: TileEdge[];

  // Render properties.
  public height : number;
  public width : number;
  public xPos : number;
  public yPos : number;
  public tilePlacement : TilePlacement;
  public rollNum : number;

  constructor(params: TileParams) {
    this.tileType = params.tileType;
    this.tilePlacement = params.tilePlacement;
    this.height = Tile.Height
    this.width = Tile.Width
  }
}

export class LandTile extends Tile{
  constructor(params: TileParams) {
    super(params)
    this.corners = params.cornerList;
    this.edges = params.edgeList;
  }
};

export class WaterTile extends Tile {
  constructor(xPos: number, yPos: number) {
    const params: TileParams = {
      tileType: TileType.WATER,
      tilePlacement: TilePlacement.WATER,
      cornerList: null,
      edgeList: null,
    }
    super(params)
    this.xPos = xPos;
    this.yPos = yPos;
  }
};

export class CoastTile extends Tile {
  constructor(xPos: number, yPos: number, tileType: TileType) {
    const params: TileParams = {
      tileType: tileType,
      tilePlacement: TilePlacement.WATER,
      cornerList: null,
      edgeList: null,
    }
    super(params)
    this.xPos = xPos;
    this.yPos = yPos;

    switch(tileType) {
        case TileType.COAST_BOTTOM_CENTER:
          this.height = 37
          this.width = 93
          break;
        case TileType.COAST_BOTTOM_LEFT:
          this.height = 78
          this.width = 65
          break;
        case TileType.COAST_BOTTOM_RIGHT:
          this.height = 79
          this.width = 66
          break;
        case TileType.COAST_TOP_CENTER:
          this.height = 37
          this.width = 92
          break;
        case TileType.COAST_TOP_LEFT:
          this.height = 79
          this.width = 65
          break;
        case TileType.COAST_TOP_RIGHT:
          this.height = 77
          this.width = 67
          break;
            
    }
  }
};
