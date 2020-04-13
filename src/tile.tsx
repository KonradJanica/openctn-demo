import * as React from 'react';

import {TileCorner} from './tile-corner';
import {TileEdge} from './tile-edge';

export enum TileType {
  DESERT,
  GRAIN,
  LUMBER,
  WOOL,
  ORE,
  BRICK,
}

type TileProps = {
  tileType: TileType,
  xPos: number,
  yPos: number,
}

export default class Tile extends React.Component<TileProps> {
  static readonly Height = 100;
  static readonly Width = 100;
  
  // Game properties.
  private tileCornerList : TileCorner[];
  private tileEdgeList : TileEdge[];

  // Render properties.
  public xPos : number;
  public yPos : number;

  render() {
    const posStyle : React.CSSProperties = {
      position: 'absolute',
      top: this.props.yPos,
      left: this.props.xPos,
    };
    return (<div className="tile" style={posStyle}>{this.props.tileType}</div>);
  }
};
