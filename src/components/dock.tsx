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

  render() {
    const posStyle : React.CSSProperties = {
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
    return (<div className="dock" style={posStyle}>
        <img src={this.getCoveImg()}></img>
        <img style={typeStyle} src={this.getTypeImg()}></img>
    </div>)
  }
}
