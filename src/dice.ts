class Dice {
  /**
   * Returns the sum of two dice: [2, 12]
   * Returns promise in case of server-sided await.
   */
  async RollDice(): Promise<number> {
    return this.RollDie() + this.RollDie();
  }

  private RollDie(): number {
    return Math.ceil(Math.random() * 6);
  }
}