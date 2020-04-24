import * as React from "react";
import * as Components from "./components"
import { connect } from 'react-redux';
import { SetBoard } from '../redux/actions'
import { TileType } from "../models/tile";
import { Shuffle } from "../util/shuffle";
import { DockType } from "../models/dock";

export class BoardSmall extends React.Component<any> {
  static readonly AmountTiles = 19;

  constructor(props) {
    super(props) 

    const TILE_TYPE_AMOUNT_BRICK = 3;
    const TILE_TYPE_AMOUNT_DESERT = 1;
    const TILE_TYPE_AMOUNT_GRAIN = 4;
    const TILE_TYPE_AMOUNT_LUMBER = 4;
    const TILE_TYPE_AMOUNT_ORE = 3;
    const TILE_TYPE_AMOUNT_WOOL = 4;
    
    const availableTiles = [
      ...Array(TILE_TYPE_AMOUNT_BRICK).fill(TileType.BRICK),
      ...Array(TILE_TYPE_AMOUNT_DESERT).fill(TileType.DESERT),
      ...Array(TILE_TYPE_AMOUNT_GRAIN).fill(TileType.GRAIN),
      ...Array(TILE_TYPE_AMOUNT_LUMBER).fill(TileType.LUMBER),
      ...Array(TILE_TYPE_AMOUNT_ORE).fill(TileType.ORE),
      ...Array(TILE_TYPE_AMOUNT_WOOL).fill(TileType.WOOL),
    ];
    Shuffle(availableTiles);

    const availableDockTypes = [
      ...Array(4).fill(DockType.ANY),
      DockType.BRICK,
      DockType.GRAIN,
      DockType.LUMBER,
      DockType.ORE,
      DockType.WOOL,
    ];
    Shuffle(availableDockTypes);
    
    this.props.SetBoard({
      availableTiles: availableTiles,
      availableDockTypes: availableDockTypes,
    });
  }

  render() {
    return (
      <div className="board">
        {this.props.tiles.map((val, i) => {
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
        {this.props.waterTiles.map((val, i) => {
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
        {this.props.docks.map((val, i) => {
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

const mapStateToProps = state => {
  return {
    tiles: state.board.tiles,
    waterTiles: state.board.waterTiles,
    docks: state.board.docks,
  };
};

export default connect(
  mapStateToProps,
  { SetBoard }
)(BoardSmall);