import dedent from 'dedent-js';
import { foreGroundColor, moveCursorUp, moveCursorForward } from '@glowlamp/control-sequences';
import { ubuntu } from '@glowlamp/colors';
import List from './List';
import { DashUnorderedStrategy } from "./OrderStrategy";
import ListItem, { BlankListItem } from "./ListItem";

export function repeat(n, f) {
  return Array.from({ length: n }, (_, i) => f ?? i);
}

function getLines(multiLineString = '') {
  return dedent(multiLineString).split('\n');
}

const moveCursorUpBy = Symbol('moveCursorUpBy');
const moveCursorForwardBy = Symbol('moveCursorForwardBy');
const whenColor = Symbol('whenColor');
const thenColor = Symbol('thenColor');

/**
 * @type rules
 */
export const rules = {
  /* ------------------------------ */
  [moveCursorUpBy]: moveCursorUp(1),
  set moveUp(n) {
    rules[moveCursorUpBy] = moveCursorUp(n);
  },
  get moveUp() {
    return rules[moveCursorUpBy];
  },
  /* ------------------------------ */
  [moveCursorForwardBy]: moveCursorForward(2),
  set moveForward(n) {
    rules[moveCursorForwardBy] = moveCursorForward(n);
  },
  get moveForward() {
    return rules[moveCursorForwardBy];
  },
  /* ------------------------------ */
  [whenColor]: foreGroundColor(ubuntu.yellow),
  set whenColor(_color) {
    rules[whenColor] = foreGroundColor(_color);
  },
  get whenColor() {
    return rules[whenColor];
  },
  /* ------------------------------ */
  [thenColor]: foreGroundColor(ubuntu.green),
  set thenColor(_color) {
    rules[thenColor] = foreGroundColor(_color);
  },
  get thenColor() {
    return rules[thenColor];
  },
  /* ------------------------------ */
};

/**
 * Function to format the multiline strings, to be used for t.comment function parameter.
 * @param {rules=} formatter
 * @returns {descriptionObject}
 */
export function description(formatter = rules) {
  const listFactory = {
    list: (orderStrategy = new DashUnorderedStrategy()) => new List(orderStrategy),
    listItem: (string) => new ListItem(string),
  };
  const descriptionContainer = new List(new DashUnorderedStrategy());
  const thenDescription = {
    then(cb) {
      descriptionContainer
        .li(new ListItem('Then:'))
        .li(cb(listFactory));
      return thenDescription;
    },
    formattedWith() {

    },
    get script() {
      return thenDescription.formattedWith();
    },
  };
  const whenDescription = {
    when(cb) {
      descriptionContainer
        .li(new ListItem('When:'))
        .li(cb(listFactory))
        .li(new BlankListItem());
      return thenDescription;
    },
  };
  return whenDescription;
}
