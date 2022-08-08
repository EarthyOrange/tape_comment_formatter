import {foregroundColor, MoveCursorHorizontally} from '@glowlamp/control-sequences';
import {ubuntu} from '@glowlamp/colors';
import {BlankListItem, Column, ListItem, OrderStrategy, ViewRules} from '@glowlamp/glow';

/**
 * Function to format the multiline strings, to be used for t.comment function parameter.
 * @function
 * @returns {When}
 */
export default function description() {
  const { DashUnorderedStrategy } = OrderStrategy;
  const whenRules = new ViewRules()
    .setIndentation(new MoveCursorHorizontally(2))
    .setForegroundColor(foregroundColor(ubuntu.yellow));
  const thenRules = new ViewRules()
    .setIndentation(new MoveCursorHorizontally(2))
    .setForegroundColor(foregroundColor(ubuntu.green));

  /**
   * @function
   * @returns {ListBuilder}
   */
  const listFactory = (rules) => ({
    list: (orderStrategy = new DashUnorderedStrategy()) => Column(orderStrategy).setViewRules(rules),
    listItem: (string) => new ListItem(string),
    rules,
  });

  const whenListFactory = listFactory(whenRules);
  const thenListFactory = listFactory(thenRules);
  const descriptionContainer = Column(new DashUnorderedStrategy())
    .setViewRules(
      new ViewRules().setIndentation(new MoveCursorHorizontally(4)),
    );

  /**
   * @typedef ScriptContainer
   * @type {object}
   */
  const scriptContainer = {
    /**
     * @readonly
     * @returns {string}
     */
    get script() {
      return descriptionContainer.getViewable();
    },
  };

  /**
   * @typedef Then
   * @type {object}
   */
  const thenDescription = {
    /**
     * @function
     * @param cb
     * @returns {ScriptContainer}
     */
    then(cb) {
      descriptionContainer
        .li(
          new ListItem('Then:')
            .setViewRules(
              new ViewRules().setForegroundColor(foregroundColor(ubuntu.green)),
            ),
        )
        .li(cb(thenListFactory));
      return scriptContainer;
    },
  };
  return {
    /**
     * @function
     * @param cb
     * @returns {Then}
     */
    when(cb) {
      descriptionContainer
        .li(
          new ListItem('When:')
            .setViewRules(
              new ViewRules().setForegroundColor(foregroundColor(ubuntu.yellow)),
            ),
        )
        .li(cb(whenListFactory))
        .li(new BlankListItem());
      return thenDescription;
    },
  };
}
