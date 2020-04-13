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
    return `./assets/board/RES_wool.png`;
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
