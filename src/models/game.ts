import Dice from "./dice";
import BoardSmall from "./board-small";
import { IBoard } from "./board-interface";
import { Player } from "./player";

export default class Game {
    private readonly dice: Dice
    private readonly board: IBoard;
    private readonly players: Player[];

    private activePlayerIdx: number;

    constructor(numPlayers: number) {
        this.dice = new Dice();
        this.board = new BoardSmall();
        this.players = [];
        for (let i = 0; i < numPlayers; ++i) {
            this.players.push(new Player(i.toString()));
        }
        this.activePlayerIdx = 0;
    }

    public GetBoard(): IBoard {
        return this.board;
    }

    public EndTurn() {
        this.activePlayerIdx = (this.activePlayerIdx + 1) % this.players.length;
    }
}