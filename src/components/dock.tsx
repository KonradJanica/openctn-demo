import * as React from 'react';
import * as Models from '../models/models'

type DockProps = Models.Dock;

export default class Dock extends React.Component<DockProps> {
  getCoveImg(): string {
    return `./assets/board/${this.props.dockPlacement}.png`;
  }

  getTypeImg(): string {
    return `./assets/board/${this.props.dockType}.png`;
  }

  getDockImg(): string {
    return `./assets/board/DOCK_standard.png`;
  }

  render() {
    const posStyle: React.CSSProperties = {
        position: 'absolute',
        top: this.props.yPos + Models.Tile.Height / 2 - this.props.height / 2,
        left: this.props.xPos + Models.Tile.Width / 2 - this.props.width / 2,
    };
    const typeStyle : React.CSSProperties = {
        position: 'absolute',
        top: this.props.height / 2 - Models.Dock.DockTypeHeight / 2,
        left: this.props.width / 2 - Models.Dock.DockTypeWidth / 2,
        zIndex: 100,
    };
    const placer1Style: React.CSSProperties = {
        position: 'absolute',
        top: this.props.yPlacer1Pos + Models.Tile.Height / 2 - Models.Dock.DockPlacerHeight / 2,
        left: this.props.xPlacer1Pos - Models.Dock.DockPlacerWidth / 2,
        zIndex: 100,
    };
    const placer2Style: React.CSSProperties = {
        position: 'absolute',
        top: this.props.yPlacer2Pos + Models.Tile.Height / 2 - Models.Dock.DockPlacerHeight / 2,
        left: this.props.xPlacer2Pos - Models.Dock.DockPlacerWidth / 2,
        zIndex: 100,
    };
    return (<div className="dock">
        <div className="cove" style={posStyle}>
            <img src={this.getCoveImg()}></img>
            <img style={typeStyle} src={this.getTypeImg()}></img>
        </div>
        <div className="dock-placer1" style={placer1Style}>
            <img src={this.getDockImg()}></img>
        </div>
        <div className="dock-placer2" style={placer2Style}>
            <img src={this.getDockImg()}></img>
        </div>
    </div>)
  }
}
