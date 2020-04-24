import * as React from 'react';
import * as Components from './components/components';

import { connect } from 'react-redux';
import { AddPlayer, EndTurn } from './redux/actions'
import Dice from './components/dice';

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
        <Components.BoardSmall />
        <button onClick={() => this.props.AddPlayer("name")}>Add Player</button>
        <button onClick={() => this.props.EndTurn()}>End Turn</button>
        {this.props.game.players.map((val, i) =>
          <button key={i} style={this.props.game.activePlayerIdx == i ? activeStyle : null}>
            {val.id}
          </button>)}
        <Dice />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.game,
    board: state.board,
  };
};

export default connect(
  mapStateToProps,
  { AddPlayer, EndTurn }
)(App);