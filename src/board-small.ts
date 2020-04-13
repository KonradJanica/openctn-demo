import {Tile} from './tile'

export class BoardSmall {
  static readonly AmountTiles = 19;

  private readonly tiles: Tile[];

  constructor() {
    this.tiles = [];
    for (let i = 0; i < BoardSmall.AmountTiles; ++i) {
      this.tiles.push(new Tile(null));
    }
    this.positionTiles();
  }

  positionTiles() {
    let xPos = Tile.Width;
    let yPos = 0;
    let i = 0;
    let j = 3
    for (; i < j; ++i) {
      xPos += Tile.Width;
      this.tiles[i].xPos = xPos;
      this.tiles[i].yPos = yPos;
    }

    xPos = Tile.Width / 2;
    yPos += Tile.Height;
    j += 4;
    for (; i < j; ++i) {
      xPos += Tile.Width;
      this.tiles[i].xPos = xPos;
      this.tiles[i].yPos = yPos;
    }

    xPos = 0;
    yPos += Tile.Height;
    j += 5;
    for (; i < j; ++i) {
      xPos += Tile.Width;
      this.tiles[i].xPos = xPos;
      this.tiles[i].yPos = yPos;
    }

    xPos = Tile.Width / 2;
    yPos += Tile.Height;
    j += 4;
    for (; i < j; ++i) {
      xPos += Tile.Width;
      this.tiles[i].xPos = xPos;
      this.tiles[i].yPos = yPos;
    }

    xPos = Tile.Width;
    yPos += Tile.Height;
    j += 3;
    for (; i < j; ++i) {
      xPos += Tile.Width;
      this.tiles[i].xPos = xPos;
      this.tiles[i].yPos = yPos;
    }
  }

  drawTiles() {
    return this.tiles.map(function (val, i) {
      return `<div style="position:absolute;top:${val.yPos}px;left:${val.xPos}px;">
        ${i}
      </div>`;
    }).join("");
  }
}
