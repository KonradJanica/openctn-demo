import * as React from 'react';
import * as Models from '../models/models'

import {TileType} from '../models/tile'

type TileProps = {
  tileType: TileType,
  xPos: number,
  yPos: number,
}

export default class Tile extends React.Component<TileProps> {
  getImg(): string {
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
      default:
        // TODO: Replace with LocalLogger class
        console.error(`[components/tile.tsx] Unknown tile type: ${this.props.tileType}`);
    }
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
      width: Models.Tile.Width + 2,
    };
    return (<div className="tile" style={posStyle}>
      <img style={imgStyle} src={this.getImg()}></img>
    </div>);
  }
}
