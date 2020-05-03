import { END_TURN, ADD_PLAYER, SET_DICE, ADD_CORNER } from '../actionTypes'
import { Player, PlayerColors, CreatePlayer } from '../../models/player';

const MAX_PLAYERS = 5;

interface state {
    die1: number,
    die2: number,
    players: Player[],
    activePlayerIdx: number,
    activePlayerColor: PlayerColors,
    availableColors: PlayerColors[],
}

const initialState : state = {
    die1: 0,
    die2: 0,
    players: [],
    activePlayerIdx: -1,
    activePlayerColor: PlayerColors.NONE,
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
    const activePlayerIdx = (state.activePlayerIdx + 1) % state.players.length;
    const activePlayerColor = state.players[activePlayerIdx].color;
    return {
        ...state,
        activePlayerIdx,
        activePlayerColor,
    };
};
handlers[ADD_PLAYER] = (state: state, action) : state => {
    if (state.players.length == MAX_PLAYERS) {
        return state;
    }
    const player = CreatePlayer(action.payload.name);
    player.color = state.availableColors.pop();
    let res = {
        ...state,
        players: [...state.players, player],
    };
    if (res.activePlayerIdx === -1) {
        res.activePlayerIdx = 0;
        res.activePlayerColor = res.players[0].color;
    }
    return res;
};
handlers[SET_DICE] = (state: state, action) : state => {
    return {
        ...state,
        die1: action.payload.die1,
        die2: action.payload.die2,
    };
};
handlers[ADD_CORNER] = (state: state, action) : state => {
    state.players[state.activePlayerIdx].lands.push(action.payload.tileCorner);
    return {
        ...state,
    };
};

export default function(state = initialState, action) {
    const handler = handlers[action.type];
    if (handler) {
        return handler(state, action);
    }
    return state;
}