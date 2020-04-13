import {IBoard} from './board-interface';
import {Player} from './player';

export interface SetupParams {
  // The currently uninitialized board.
  board: IBoard;
  // The list of players organized in seating order.
  players: Player[];
};

export interface FirstPlayer {
  player: Player;
  index: number;
};

export interface SetupResult {
  firstPlayer: FirstPlayer;
};

/**
 * Service to initialize the game.
 * This plays out the initial part of the game, which is for each player to
 * select their tile-corners and tile-edges and collect necessary resources.
 * Once setup has been completed, the game can move onto the player turn phase
 * of the game.
 */
export class SetupService {
  /**
   * Returns promise that resolves once the game setup phase is complete.
   * @param board 
   * @param players 
   * @return Resolves once board setup has completed.
   */
  static async Setup(setupParams: SetupParams): Promise<SetupResult> {
    // Select the first player.
    const firstPlayer = this.SelectFirstPlayer(setupParams.players);
    const playerCount = setupParams.players.length;

    const getCurrentPlayerIndex = (i) => (firstPlayer.index + i) % playerCount;

    for (let i = 0; i < playerCount; i++) {
      const currentPlayerIndex = getCurrentPlayerIndex(i);
      /**
       * TODO:
       *  Await for player to select TileCorner.
       *  Update TileCorner to CITY state.
       *  Await for player to select TileEdge.
       *  Update TileEdge.
       */ 
    }
    for (let i = playerCount - 1; i >= 0; i--) {
      const currentPlayerIndex = getCurrentPlayerIndex(i);
      /**
       * TODO:
       *  Await for player to select TileCorner.
       *  Update TileCorner to CITY state.
       *  Await for player to select TileEdge.
       *  Update TileEdge.
       *  Give one resource from each Tile attached to TileCorner to player.
       */
    }

    return {firstPlayer};
  }

  private static SelectFirstPlayer(players: Player[]): FirstPlayer {
    const index = Math.floor(Math.random() * players.length);
    return {player: players[index], index};
  }
}