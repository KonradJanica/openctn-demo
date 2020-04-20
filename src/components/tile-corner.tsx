import * as React from 'react';
import * as Models from '../models/models'

import Config from '../config';
import { TileType } from '../models/tile'
import { TileCornerType } from '../models/tile-corner';
import { TileEdge } from '../models/tile-edge';

type TileCornerProps = {
  tileCornerType: TileCornerType,
  height: number,
  width: number,
  xPos: number,
  yPos: number,
  debugIdx: number,
}

export default class TileCorner extends React.Component<TileCornerProps> {
  getTileImg(): string {
    return `./assets/pieces/STRUCTURE_settlement_blue.png`;
  }

  debug() {
    return null;
  }

  render() {
    const posStyle : React.CSSProperties = {
      position: 'absolute',
      top: this.props.yPos,
      left: this.props.xPos,
      zIndex: 10000,
    };
    const imgStyle : React.CSSProperties = {
      // Some tiles don't overlap perfectly, add some buffer.
      // Alternatively, we can increase the size of the problem images.
      height: this.props.width,
      width: this.props.height,
    };
    return (<div className="tileCorner" style={posStyle}>
      <img style={imgStyle} src={this.getTileImg()}></img>
      {this.debug()}
    </div>);
  }
}
