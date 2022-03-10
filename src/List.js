import ListItem, { BlankListItem } from './ListItem';
import MixIn from './mix_in';
import ViewableTrait from './ViewableTrait';

/**
 * @class List
 */
export default class List extends MixIn(ViewableTrait) {
  constructor(orderStrategy) {
    super();
    this.orderStrategy = orderStrategy;
    this.container = [];
  }

  /**
   *
   * @param {ListItem|List} item
   * @returns {List}
   */
  li(item) {
    if (item instanceof List || item instanceof BlankListItem) {
      this.container.push(item);
    }
    else if (item instanceof ListItem) {
      this.container.push(item.setOrderToken(this.orderStrategy.getNext()));
    }
    return this;
  }

  getViewable() {
    this.container.reduce()
  }
}

// ToDo: Consider adding UI info to format List
