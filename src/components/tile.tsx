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
      height: Models.Tile.Height,
      width: Models.Tile.Width,
    };
    return (<div className="tile" style={posStyle}>
      <img src={this.getImg()}></img>
    </div>);
  }
}
