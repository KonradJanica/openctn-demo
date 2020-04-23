import { END_TURN, ADD_PLAYER } from './actionTypes'

export const EndTurn = () => ({
    type: END_TURN,
});

export const AddPlayer = (name) => ({
    type: ADD_PLAYER,
    payload: { name },
});