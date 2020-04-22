export default class Dice {
  private die1: number;
  private die2: number;

  /**
   * Returns the sum of two dice: [2, 12]
   */
  public RollDice(): number {
    this.die1 = this.RollDie();
    this.die2 = this.RollDie();
    return this.die1 + this.die2;
  }

  public GetDie1(): number {
    return this.die1;
  }

  public GetDie2(): number {
    return this.die2;
  }

  private RollDie(): number {
    return Math.ceil(Math.random() * 6);
  }
}