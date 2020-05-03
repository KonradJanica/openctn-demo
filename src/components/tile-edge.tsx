import * as React from 'react';
import * as Models from '../models/models'

import Config from '../config';
import { TileType } from '../models/tile'
import { TileCornerType } from '../models/tile-corner';
import { connect } from 'react-redux';
import { TileEdgeType } from '../models/tile-edge';
import { PlayerColors } from '../models/player';
import { AddEdge } from '../redux/actions'

type TileEdgeProps = {
  tileEdgeType: TileEdgeType,
  xPos: number,
  yPos: number,
  color: PlayerColors,
  index: number,
  debugIdx: number,
}

export class TileEdge extends React.Component<any> {
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

  hitboxClick() {
    this.props.AddEdge({
      tileIdx: this.props.tileIdx,
      edgeId: this.props.edgeId,
      color: this.props.activePlayerColor,
      tileEdge: this.props.tileEdge,
    });
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
      <div className="tile-edge-hitbox" style={imgStyle} onClick={() => this.hitboxClick()}>
        {this.isOwned() ? <img style={imgStyle} src={this.getTileImg()}></img> : null}
      </div>
      {this.debug()}
    </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  const tileEdge = state.board.tiles[ownProps.tileIdx].edges.find(el => el.edgeId === ownProps.edgeId);
  return {
    tileEdge,
    color: tileEdge.color,
    activePlayerColor: state.game.activePlayerColor,
  };
};

export default connect(
  mapStateToProps,
  { AddEdge }
)(TileEdge);