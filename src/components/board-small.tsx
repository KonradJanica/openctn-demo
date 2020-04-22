import * as React from "react";

import * as Components from "./components"
import { IBoard } from "../models/board-interface";

type BoardSmallProps = {
  board: IBoard
}
type BoardSmallState = BoardSmallProps

export default class BoardSmall extends React.Component<BoardSmallProps, BoardSmallState> {
  static readonly AmountTiles = 19;

  constructor(props) {
    super(props)
    this.state = {
      board: props.board,
    };
  }

  render() {
    return (
      <div className="board">
        {this.state.board.GetTiles().map((val, i) => {
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
        {this.state.board.GetWaterTiles().map((val, i) => {
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
        {this.state.board.GetDocks().map((val, i) => {
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
