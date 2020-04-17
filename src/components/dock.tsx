import * as React from 'react';
import * as Models from '../models/models'

type DockProps = Models.Dock;

export default class Dock extends React.Component<DockProps> {
  getImg(): string {
    return `./assets/board/${this.props.dockPlacement}.png`;
  }

  render() {
    const posStyle : React.CSSProperties = {
      position: 'absolute',
      top: this.props.yPos + Models.Tile.Height / 2 - this.props.height / 2,
      left: this.props.xPos + Models.Tile.Width / 2 - this.props.width / 2,
    };
    return (<div className="dock" style={posStyle}>
        <img src={this.getImg()}></img>
    </div>)
  }
}
