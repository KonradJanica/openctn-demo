import { END_TURN, ADD_PLAYER, SET_DICE, SET_BOARD, ADD_CORNER } from './actionTypes'

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

export const SetBoard = (board) => ({
    type: SET_BOARD,
    payload: {
        availableTiles: board.availableTiles,
        availableDockTypes: board.availableDockTypes,
    },
});

export const AddCorner = (content) => ({
    type: ADD_CORNER,
    payload: {
        tileIdx: content.tileIdx,
        cornerId: content.cornerId,
    },
})