import * as React from "react";
import * as Components from './components/components';

export default class App extends React.Component {
  render() {
    return (
      <div className="component-app">
        <Components.BoardSmall />
      </div>
    );
  }
}