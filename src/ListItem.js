import MixIn from './mix_in';
import ViewableTrait from './ViewableTrait';

/**
 * To hold a list item (string, hex values, images?, List, etc)
 * @class ListItem
 */
export default class ListItem extends MixIn(ViewableTrait) {
  constructor(item) {
    super();
    this.orderToken = '';
    this.item = item;
  }

  setOrderToken(token) {
    this.orderToken = token;
    return this;
  }

  getViewable() {
    return `${this.orderToken} ${this.item}`;
  }
}

export class BlankListItem extends Mixin(ViewableTrait) {
  constructor() {
    super();
  }

  getViewable() {
    return ''; // ToDo: add control sequence to move the cursor to next row
  }
}

// ToDo: Consider adding UI info to format each listItem
