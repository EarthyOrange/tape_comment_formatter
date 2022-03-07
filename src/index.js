import dedent from 'dedent-js';
import { foreGroundColor, moveCursorUp, moveCursorForward } from '@glowlamp/control-sequences';
import { ubuntu } from '@glowlamp/colors';

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
  let whenLines = '';
  let thenLines = '';
  /**
   *
   * @type {descriptionObject}
   * @private
   */
  const _description = {
    /**
     * @name when
     * @method
     * @param {string} multiLineString
     * @param {rules=} whenFormatter
     * @returns {descriptionObject}
     */
    when(multiLineString = '', whenFormatter = formatter) {
      const lines = getLines(multiLineString);
      const { moveUp, moveForward: mf, whenColor: wc } = whenFormatter;
      const mf2 = repeat(2, mf).join('');
      whenLines = [
        [`${mf2}- When:`],
        lines.map((line) => `${moveUp}${mf2}${mf}${wc}${line}`),
      ]
        .flat()
        .join('\n');
      return _description;
    },
    /**
     * @name then
     * @method
     * @param {string} multiLineString
     * @param {rules=} thenFormatter
     * @returns {descriptionObject}
     */
    then(multiLineString = '', thenFormatter = formatter) {
      const lines = getLines(multiLineString);
      const { moveUp, moveForward: mf, thenColor: tc } = thenFormatter;
      const mf2 = repeat(2, mf).join('');
      thenLines = [
        [`${mf2}- Then:`],
        lines.map((line) => `${moveUp}${mf2}${mf}${tc}${line}`),
      ]
        .flat()
        .join('\n');
      return _description;
    },
    /**
     * The description
     * @property {string} script
     */
    get script() {
      return `${whenLines}\n${thenLines}`;
    },
  };
  return _description;
}
