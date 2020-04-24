import * as React from 'react';
import * as Models from '../models/models'

import Config from '../config';
import { TileType } from '../models/tile'
import { TileCornerType } from '../models/tile-corner';
import { TileEdgeType } from '../models/tile-edge';
import { PlayerColors } from '../models/player';

type TileEdgeProps = {
  tileEdgeType: TileEdgeType,
  height: number,
  width: number,
  xPos: number,
  yPos: number,
  color: PlayerColors,
  index: number,
  debugIdx: number,
}

export default class TileEdge extends React.Component<TileEdgeProps> {
  static readonly ImageInfo = [
    ['./assets/pieces/ROAD_horizontal', 113, 22],
    ['./assets/pieces/ROAD_diag_left', 54, 80],
    ['./assets/pieces/ROAD_diag_right', 54, 80],
    ['./assets/pieces/ROAD_horizontal', 113, 22],
    ['./assets/pieces/ROAD_diag_left', 54, 80],
    ['./assets/pieces/ROAD_diag_right', 54, 80],
  ];
  getTileImg(): string {
    return `${TileEdge.ImageInfo[this.props.index][0]}_${this.props.color}.png`;
  }

  isOwned() : boolean {
    return this.props.color !== PlayerColors.NONE;
  }

  debug() {
    return null;
  }

  render() {
    const posStyle : React.CSSProperties = {
      position: 'absolute',
      top: this.props.yPos,
      left: this.props.xPos,
      zIndex: 1000,
    };
    const imgStyle : React.CSSProperties = {
      // Some tiles don't overlap perfectly, add some buffer.
      // Alternatively, we can increase the size of the problem images.
      height: TileEdge.ImageInfo[this.props.index][2], 
      width: TileEdge.ImageInfo[this.props.index][1],
    };
    return (<div className="tile-edge" style={posStyle}>
      <div className="tile-edge-hitbox" style={imgStyle}>
        {this.isOwned() ? <img style={imgStyle} src={this.getTileImg()}></img> : null}
      </div>
      {this.debug()}
    </div>);
  }
}
