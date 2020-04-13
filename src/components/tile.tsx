import * as React from 'react';

import {TileType} from '../models/tile'

type TileProps = {
  tileType: TileType,
  xPos: number,
  yPos: number,
}

export default class Tile extends React.Component<TileProps> {
  render() {
    const posStyle : React.CSSProperties = {
      position: 'absolute',
      top: this.props.yPos,
      left: this.props.xPos,
    };
    return (<div className="tile" style={posStyle}>{this.props.tileType}</div>);
  }
}
