import {Shuffle} from './util/shuffle';

const DEFAULT_KNIGHT_COUNT =14;
const DEFAULT_VICTORY_POINT_COUNT = 5;
const DEFAULT_MONOPOLY_COUNT = 2;
const DEFAULT_YEAR_OF_PLENTY_COUNT = 2;
const DEFAULT_ROAD_BUILDING_COUNT = 2;

export enum CardType {
  KNIGHT,
  VICTORY_POINT,
  MONOPOLY,
  YEAR_OF_PLENTY,
  ROAD_BUILDING,
};

export class DevelopmentDeck {
  private readonly deck: CardType[];
  private currentPos = 0;

  constructor() {
    this.deck = [
      ...Array(DEFAULT_KNIGHT_COUNT).fill(CardType.KNIGHT),
      ...Array(DEFAULT_VICTORY_POINT_COUNT).fill(CardType.VICTORY_POINT),
      ...Array(DEFAULT_MONOPOLY_COUNT).fill(CardType.MONOPOLY),
      ...Array(DEFAULT_YEAR_OF_PLENTY_COUNT).fill(CardType.YEAR_OF_PLENTY),
      ...Array(DEFAULT_ROAD_BUILDING_COUNT).fill(CardType.ROAD_BUILDING),
    ];

    Shuffle(this.deck);
  }

  IsEmpty() {
    return this.currentPos >= this.deck.length;
  }

  GetNext(): CardType {
    return this.deck[this.currentPos++];
  }
};