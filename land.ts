import {Road} from './road'

export class Land {
  private readonly roads: Road[];

  constructor(roads: Road[]) {
    this.roads = roads;
  }
}