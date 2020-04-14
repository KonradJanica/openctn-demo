import {TileCorner} from './tile-corner';
import {TileEdge} from './tile-edge';
import {assert} from '../util/error';

export enum TileType {
  DESERT = "desert",
  GRAIN = "grain",
  LUMBER = "lumber",
  WOOL = "wool",
  ORE = "ore",
  BRICK = "brick",
  WATER = "water",
  COAST_TOP_CENTER = "coast_top_center",
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
  const res = [];
  switch(t.tilePlacement) {
    case TilePlacement.COAST_TOP: {
      res.push(new WaterTile(t.xPos, t.yPos - Tile.Height));
      break;
    }
    case TilePlacement.COAST_TOP_LEFT_2:
    case TilePlacement.COAST_TOP_RIGHT_2: {
      res.push(new WaterTile(t.xPos, t.yPos - Tile.Height));
      break;
    }
    case TilePlacement.COAST_TOP_LEFT_3: {
      res.push(new WaterTile(t.xPos, t.yPos - Tile.Height));
      res.push(new WaterTile(t.xPos - Tile.Width * 0.75, t.yPos - Tile.Height / 2));
      break;
    }
    case TilePlacement.COAST_TOP_RIGHT_3: {
      res.push(new WaterTile(t.xPos, t.yPos - Tile.Height));
      res.push(new WaterTile(t.xPos + Tile.Width * 0.75, t.yPos - Tile.Height / 2));
      break;
    }
    case TilePlacement.COAST_LEFT: {
      res.push(new WaterTile(t.xPos - Tile.Width * 0.75, t.yPos - Tile.Height / 2));
      res.push(new WaterTile(t.xPos - Tile.Width * 0.75, t.yPos + Tile.Height / 2));
      break;
    }
    case TilePlacement.COAST_BOTTOM: {
      res.push(new WaterTile(t.xPos, t.yPos + Tile.Height));
      break;
    }
    case TilePlacement.COAST_BOTTOM_LEFT_2:
    case TilePlacement.COAST_BOTTOM_RIGHT_2: {
      res.push(new WaterTile(t.xPos, t.yPos + Tile.Height));
      break;
    }
    case TilePlacement.COAST_BOTTOM_LEFT_3: {
      res.push(new WaterTile(t.xPos, t.yPos + Tile.Height));
      res.push(new WaterTile(t.xPos - Tile.Width * 0.75, t.yPos + Tile.Height / 2));
      break;
    }
    case TilePlacement.COAST_BOTTOM_RIGHT_3: {
      res.push(new WaterTile(t.xPos, t.yPos + Tile.Height));
      res.push(new WaterTile(t.xPos + Tile.Width * 0.75, t.yPos + Tile.Height / 2));
      break;
    }
    case TilePlacement.COAST_RIGHT: {
      res.push(new WaterTile(t.xPos + Tile.Width * 0.75, t.yPos + Tile.Height / 2));
      res.push(new WaterTile(t.xPos + Tile.Width * 0.75, t.yPos - Tile.Height / 2));
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
    assert(params.cornerList.length == 6, "Number of corners must be 6.")
    assert(params.edgeList.length == 6, "Number of edges must be 6.")
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
    this.height = 128
    this.width = 140
  }
};

//export class CoastTile extends Tile {
  //readonly Height = 158;
  //readonly Width = 158;
  //constructor(xPos: number, yPos: number) {
    //const params: TileParams = {
      //tileType: TileType.COAST_TOP_CENTER,
      //tilePlacement: TilePlacement.WATER,
      //cornerList: null,
      //edgeList: null,
    //}
    //super(params)
    //this.xPos = xPos;
    //this.yPos = yPos;
  //}
//};
