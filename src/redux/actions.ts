import { END_TURN, ADD_PLAYER, SET_DICE } from './actionTypes'

export const EndTurn = () => ({
    type: END_TURN,
});

export const AddPlayer = (name) => ({
    type: ADD_PLAYER,
    payload: { name },
});

export const SetDice = (dice) => ({
    type: SET_DICE,
    payload: {
        die1: dice.die1,
        die2: dice.die2,
    },
});