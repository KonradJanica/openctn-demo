import * as React from 'react';
import * as Models from '../models/models'
import * as Components from "./components"

import Config from '../config';
import { TileType } from '../models/tile'
import { TileCorner } from '../models/tile-corner';
import { TileEdge } from '../models/tile-edge';

type TileProps = {
  tileType: TileType,
  height: number,
  width: number,
  xPos: number,
  yPos: number,
  rollNum: number,
  cornerList: TileCorner[];
  edgeList: TileEdge[];
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
    // Only show debug for land tiles
    if (!Config.IsDebug ||
        this.props.tileType.toLowerCase().includes("water") ||
        this.props.tileType.toLowerCase().includes("coast")) return null;
    const debugStyle : React.CSSProperties = {
      position: 'absolute',
      top: Models.Tile.Height / 4,
      left: Models.Tile.Width / 4,
    };
    return (<div style={debugStyle}>
        <div className="debug">{this.props.debugIdx}</div>
      <div className="debug-small">
        {`corners:${this.props.cornerList.length}, edges:${this.props.edgeList.length}`}
      </div>
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
    let corners = [];
    if (this.props.cornerList != undefined) {
      corners = this.props.cornerList;
    }

    let edges = [];
    if (this.props.edgeList != undefined) {
      edges = this.props.edgeList;
    }

    return (<div className="tile" style={posStyle}>
      <img style={imgStyle} src={this.getTileImg()}></img>
      {this.props.rollNum !== 0 ? <img style={rollNumbStyle} src={this.getRollNumImg()}></img> : null}
      {
        corners.map((val, i) => {
          if (!val.isRendered) {
            val.isRendered = true;
            return <Components.TileCorner
            xPos={val.xPos}
            yPos={val.yPos}
            width={Models.TileCorner.Width}
            height={Models.TileCorner.Height}
            tileCornerType={val.State().cornerType}
            debugIdx={i}
            key={i}
              />
          }
        })
      }
      {
        edges.map((val, i) => {
          if (!val.isRendered) {
            val.isRendered = true;
            return <Components.TileEdge
            xPos={val.xPos}
            yPos={val.yPos}
            width={val.width}
            height={val.height}
            tileEdgeType={val.State().EdgeType}
            index={i}
            debugIdx={i}
            key={i}
              />
          }
        })
      }
      {this.debug()}
    </div>);
  }
}
