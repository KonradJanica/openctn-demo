import {IBoard} from './board-interface';
import {Tile} from './tile'
import React from "react";

export default class BoardSmall extends React.Component implements IBoard {
  static readonly AmountTiles = 19;

  private readonly tiles: Tile[];

  constructor(props) {
    super(props)
    this.tiles = [];
    for (let i = 0; i < BoardSmall.AmountTiles; ++i) {
      this.tiles.push(new Tile(null));
    }
    this.positionTiles();
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
    return this.tiles.map((val, i) => {
      const posStyle = {
        position: 'absolute',
        top: val.yPos,
        left: val.xPos,
      };
      return <div style={posStyle}>{i}</div>;
    });
  }
  
  /** @implements */
  GetTiles() {
    return this.tiles;
  }
}
