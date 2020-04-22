import * as React from "react";
import * as Components from './components/components';
import { BoardSmall } from "./models/models";
import Game from "./models/game";

type GameState = Game;

export default class App extends React.Component<any, GameState> {
  constructor(props) {
    super(props)
    this.state = new Game(4);
  }

  render() {
    return (
      <div className="component-app">
        <Components.BoardSmall board={this.state.GetBoard()} />
        <button onClick={() => this.state.EndTurn}>End Turn</button>
      </div>
    );
  }
}