import * as React from 'react';
import * as Models from '../models/models'

import {TileType} from '../models/tile'
import Config from '../config';

type TileProps = {
  tileType: TileType,
  height: number,
  width: number,
  xPos: number,
  yPos: number,
  rollNum: number,
  debugIdx: number,
}

export default class Tile extends React.Component<TileProps> {
  getTileImg(): string {
    return `./assets/board/${this.props.tileType}.png`;
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
      // Some tiles don't overlap perfectly, add some buffer.
      // Alternatively, we can increase the size of the problem images.
      height: this.props.height + 3,
      width: this.props.width + 3,
    };
    const rollNumbStyle : React.CSSProperties = {
      position: 'absolute',
      zIndex: 100,
      top: this.props.height / 2 - Models.Tile.RollNumHeight / 2,
      left: this.props.width / 2 - Models.Tile.RollNumWidth / 2,
    };
    return (<div className="tile" style={posStyle}>
      <img style={imgStyle} src={this.getTileImg()}></img>
      {this.props.rollNum !== 0 ? <img style={rollNumbStyle} src={this.getRollNumImg()}></img> : null}
      {this.debug()}
    </div>);
  }
}
