import { END_TURN, ADD_PLAYER, SET_DICE, ADD_CORNER } from '../actionTypes'
import { Player, PlayerColors } from '../../models/player';

const MAX_PLAYERS = 5;

interface state {
    die1: number,
    die2: number,
    players: Player[],
    activePlayerIdx: number,
    availableColors: PlayerColors[],
}

const initialState : state = {
    die1: 0,
    die2: 0,
    players: [],
    activePlayerIdx: 0,
    availableColors: [
        PlayerColors.BLUE,
        PlayerColors.GREEN,
        PlayerColors.ORANGE,
        PlayerColors.RED,
        PlayerColors.WHITE,
    ]
}

const handlers = {};
handlers[END_TURN] = (state: state) : state => {
    return {
        ...state,
        activePlayerIdx: (state.activePlayerIdx + 1) % state.players.length,
    };
};
handlers[ADD_PLAYER] = (state: state, action) : state => {
    if (state.players.length == MAX_PLAYERS) {
        return state;
    }
    const player = new Player(action.payload.name);
    player.color = state.availableColors.pop();
    return {
        ...state,
        players: [...state.players, player],
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