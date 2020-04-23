import { END_TURN, ADD_PLAYER } from '../actionTypes'
import Dice from '../../models/dice';
import { Player } from '../../models/player';
import { BoardSmall } from '../../models/models';
import { IBoard } from '../../models/board-interface';

interface state {
    dice: Dice,
    board: IBoard,
    players: Player[],
    activePlayerIdx: number,
}

const initialState : state = {
    dice: new Dice(),
    board: new BoardSmall(),
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

export default function(state = initialState, action) {
    const handler = handlers[action.type];
    if (handler) {
        return handler(state, action);
    }
    return state;
}