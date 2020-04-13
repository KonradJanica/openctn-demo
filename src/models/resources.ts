
const INITIAL_CARD_COUNT = 19;

export enum Resource {
  BRICK,
  GRAIN,
  ORE,
  WOOD,
  WOOL,
};

export class ResourceDeck {
  private readonly deck: Map<Resource, number> = new Map<Resource, number>();

  constructor() {
    this.deck.set(Resource.BRICK, INITIAL_CARD_COUNT);
    this.deck.set(Resource.GRAIN, INITIAL_CARD_COUNT);
    this.deck.set(Resource.ORE, INITIAL_CARD_COUNT);
    this.deck.set(Resource.WOOD, INITIAL_CARD_COUNT);
    this.deck.set(Resource.WOOL, INITIAL_CARD_COUNT);
  }

  Get(resource: Resource, requestCount: number): number {
    const available = this.deck.get(resource);
    const newCount = Math.max((available - requestCount), 0);
    this.deck.set(resource, newCount);
    return (available - newCount);
  }
};