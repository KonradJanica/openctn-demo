import * as React from 'react';

import { TileCornerType } from '../models/tile-corner';
import { PlayerColors } from '../models/player';
import { connect } from 'react-redux';
import { AddCorner } from '../redux/actions'

type TileCornerProps = {
  tileCornerType: TileCornerType,
  height: number,
  width: number,
  xPos: number,
  yPos: number,
  color: PlayerColors,
  tileIdx: number,
  debugIdx: number,
}

export class TileCorner extends React.Component<any> {
  getTileImg(): string {
    return `./assets/pieces/STRUCTURE_settlement_${this.props.color}.png`;
  }

  isOwned() : boolean {
    return this.props.color !== PlayerColors.NONE;
  }

  debug() {
    return null;
  }

  hitboxClick() {
    this.props.AddCorner({
      tileIdx: this.props.tileIdx,
      cornerIdx: this.props.debugIdx,
    });
    this.forceUpdate(); // fix this by reduxing tile-corner.ts
  }

  render() {
    const posStyle : React.CSSProperties = {
      position: 'absolute',
      top: this.props.yPos,
      left: this.props.xPos,
      zIndex: 10000,
    };
    const imgStyle : React.CSSProperties = {
      position: 'absolute',
      height: this.props.width,
      width: this.props.height,
    };
    return (<div className="tile-corner" style={posStyle}>
      <div style={imgStyle} className="tile-corner-hitbox" onClick={() => this.hitboxClick()}></div>
        {this.isOwned() ? <img style={imgStyle} src={this.getTileImg()}></img> : null}
      {this.debug()}
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    // Add later
  };
};

export default connect(
  mapStateToProps,
  { AddCorner }
)(TileCorner);