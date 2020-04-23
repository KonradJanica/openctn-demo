import * as React from 'react';
import * as Components from './components/components';

import { connect } from 'react-redux';
import { AddPlayer, EndTurn } from './redux/actions'

export class App extends React.Component<any> {
  constructor(props) {
    super(props)
  }

  render() {
    const activeStyle : React.CSSProperties = {
      color: 'red',
    };
    return (
      <div className="component-app">
        <Components.BoardSmall board={this.props.game.board} />
        <button onClick={() => this.props.AddPlayer("name")}>Add Player</button>
        <button onClick={() => this.props.EndTurn()}>End Turn</button>
        {this.props.game.players.map((val, i) =>
          <button key={i} style={this.props.game.activePlayerIdx == i ? activeStyle : null}>
            {val.id}
          </button>)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.game,
  };
};

export default connect(
  mapStateToProps,
  { AddPlayer, EndTurn }
)(App);