import { combineReducers } from 'redux';
import game from './game'
import board from './board'

export default combineReducers({ game, board });
