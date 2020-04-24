import { END_TURN, ADD_PLAYER, SET_DICE } from '../actionTypes'
import { Player } from '../../models/player';
import { BoardSmall } from '../../models/models';
import { IBoard } from '../../models/board-interface';

interface state {
    die1: number,
    die2: number,
    board: IBoard,
    players: Player[],
    activePlayerIdx: number,
}

const initialState : state = {
    board: new BoardSmall(),
    die1: 0,
    die2: 0,
    players: [],
    activePlayerIdx: 0,
}

const handlers = {};
handlers[END_TURN] = (state: state) : state => {
    return {
        ...state,
        activePlayerIdx: (state.activePlayerIdx + 1) % state.players.length,
    };
};
handlers[ADD_PLAYER] = (state: state, action) : state => {
    return {
        ...state,
        players: [...state.players, new Player(action.payload.name)],
    };
};
handlers[SET_DICE] = (state: state, action) : state => {
    return {
        ...state,
        die1: action.payload.die1,
        die2: action.payload.die2,
    };
};

export default function(state = initialState, action) {
    const handler = handlers[action.type];
    if (handler) {
        return handler(state, action);
    }
    return state;
}