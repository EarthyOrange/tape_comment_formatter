/**
 * @class OrderStrategy
 */
export default class OrderStrategy {
  getNext() {
    return '';
  }
}

export class DecimalOrderedStrategy extends OrderStrategy {
  constructor() {
    super();
    this.counter = 0;
  }

  getNext() {
    this.counter += 1;
    return this.counter;
  }
}

export class DashUnorderedStrategy extends OrderStrategy {
  getNext() {
    return '-';
  }
}
