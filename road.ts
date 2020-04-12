import {Land} from './land';

export interface RoadParams {
  a: Land;
  b: Land;
}

export class Road {
  private readonly a: Land;
  private readonly b: Land;

  constructor(params: RoadParams) {
    this.a = params.a;
    this.b = params.b;
  }
};