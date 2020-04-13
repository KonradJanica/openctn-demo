import React from "react";
import BoardSmall from './board-small';

export default class App extends React.Component {
  render() {
    return (
      <div className="component-app">
        <BoardSmall />
      </div>
    );
  }
}