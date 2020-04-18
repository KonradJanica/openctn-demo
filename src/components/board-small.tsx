import * as React from "react";

import * as Components from "./components"
import * as Models from "../models/models"

export default class BoardSmall extends React.Component {
  static readonly AmountTiles = 19;

  private readonly board: Models.BoardSmall;

  constructor(props) {
    super(props)
    this.board = new Models.BoardSmall();
  }

  render() {
    return (
      <div className="board">
        {this.board.GetTiles().map((val, i) => {
          return <Components.Tile 
            xPos={val.xPos} 
            yPos={val.yPos}
            height={val.height}
            width={val.width}
            tileType={val.tileType}
            rollNum={val.rollNum}
            cornerList={val.corners}
            edgeList={val.edges}
            debugIdx={i}
            key={i}
          />
        })}
        {this.board.waterTiles.map((val, i) => {
          return <Components.Tile 
            xPos={val.xPos} 
            yPos={val.yPos}
            height={val.height}
            width={val.width}
            tileType={val.tileType}
            rollNum={0}
            cornerList={val.corners}
            edgeList={val.edges}
            debugIdx={i}
            key={i}
          />
        })}
        {this.board.docks.map((val, i) => {
          return <Components.Dock 
            xPos={val.xPos} 
            yPos={val.yPos}
            dockPlacement={val.dockPlacement}
            dockType={val.dockType}
            width={val.width}
            height={val.height}
            key={i}
          />
        })}
      </div>
    );
  }
}
