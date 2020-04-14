import * as React from 'react';
import * as Models from '../models/models'

import {TileType} from '../models/tile'
import Config from '../config';

type TileProps = {
  tileType: TileType,
  xPos: number,
  yPos: number,
  rollNum: number,
  debugIdx: number,
}

export default class Tile extends React.Component<TileProps> {
  getTileImg(): string {
    switch (this.props.tileType) {
      case TileType.BRICK:
        return `./assets/board/RES_brick.png`;
      case TileType.WOOL:
        return `./assets/board/RES_wool.png`;
      case TileType.GRAIN:
        return `./assets/board/RES_grain.png`;
      case TileType.DESERT:
       return `./assets/board/RES_desert.png`;
      case TileType.LUMBER:
        return `./assets/board/RES_wood.png`;
      case TileType.ORE:
        return `./assets/board/RES_ore.png`;
      case TileType.WATER:
        return `./assets/board/RES_water.png`;
      default:
        // TODO: Replace with LocalLogger class
        console.error(`[components/tile.tsx] Unknown tile type: ${this.props.tileType}`);
    }
  }

  getRollNumImg(): string {
    return `./assets/board/NUM_${this.props.rollNum}.png`;
  }

  debug() {
    if (!Config.IsDebug) return null;
    const debugStyle : React.CSSProperties = {
      top: Models.Tile.Height / 2,
      left: Models.Tile.Width / 2,
    };
    return (<div className="debug" style={debugStyle}>
      {this.props.debugIdx}
    </div>)
  }

  render() {
    const posStyle : React.CSSProperties = {
      position: 'absolute',
      top: this.props.yPos,
      left: this.props.xPos,
    };
    const imgStyle : React.CSSProperties = {
      height: Models.Tile.Height,
      // Some tiles don't overlap perfectly, add some buffer.
      // Alternatively, we can increase the size of the problem images.
      width: Models.Tile.Width + 3,
    };
    const rollNumbStyle : React.CSSProperties = {
      position: 'absolute',
      zIndex: 100,
      top: Models.Tile.Height / 2 - Models.Tile.RollNumHeight / 2,
      left: Models.Tile.Width / 2 - Models.Tile.RollNumWidth / 2,
    };
    return (<div className="tile" style={posStyle}>
      <img style={imgStyle} src={this.getTileImg()}></img>
      {this.props.tileType !== TileType.WATER ? <img style={rollNumbStyle} src={this.getRollNumImg()}></img> : null}
      {this.debug()}
    </div>);
  }
}
