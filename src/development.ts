import {Shuffle} from './util/shuffle';

const DEFAULT_KNIGHT_COUNT =14;
const DEFAULT_VICTORY_POINT_COUNT = 5;
const DEFAULT_MONOPOLY_COUNT = 2;
const DEFAULT_YEAR_OF_PLENTY_COUNT = 2;
const DEFAULT_ROAD_BUILDING_COUNT = 2;

export enum DevelopmentCard {
  KNIGHT,
  VICTORY_POINT,
  MONOPOLY,
  YEAR_OF_PLENTY,
  ROAD_BUILDING,
};

export class DevelopmentDeck {
  private readonly deck: DevelopmentCard[];
  private currentPos = 0;

  constructor() {
    this.deck = [
      ...Array(DEFAULT_KNIGHT_COUNT).fill(DevelopmentCard.KNIGHT),
      ...Array(DEFAULT_VICTORY_POINT_COUNT).fill(DevelopmentCard.VICTORY_POINT),
      ...Array(DEFAULT_MONOPOLY_COUNT).fill(DevelopmentCard.MONOPOLY),
      ...Array(DEFAULT_YEAR_OF_PLENTY_COUNT).fill(DevelopmentCard.YEAR_OF_PLENTY),
      ...Array(DEFAULT_ROAD_BUILDING_COUNT).fill(DevelopmentCard.ROAD_BUILDING),
    ];

    Shuffle(this.deck);
  }

  IsEmpty() {
    return this.currentPos >= this.deck.length;
  }

  GetNext(): DevelopmentCard | undefined {
    if (this.IsEmpty()) {
      return undefined;
    }

    return this.deck[this.currentPos++];
  }
};