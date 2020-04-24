import * as React from 'react';
import * as Models from '../models/models'

import { connect } from 'react-redux';
import { SetDice } from '../redux/actions'

export class Dice extends React.Component<any> {

  rollDice() {
    const rollDie = function(): number {
      return Math.ceil(Math.random() * 6);
    };
    this.props.SetDice({
      die1: rollDie(),
      die2: rollDie(),
    });
  }

  render() {
    return (<div className="dice">
      <button onClick={() => this.rollDice()}>{this.props.die1}</button>
      <button onClick={() => this.rollDice()}>{this.props.die2}</button>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    die1: state.game.die1,
    die2: state.game.die2,
  };
};

export default connect(
  mapStateToProps,
  { SetDice }
)(Dice);