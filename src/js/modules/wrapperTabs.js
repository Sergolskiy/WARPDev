/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-escape */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/**
 * @fileOverview
 * @author Zoltan Toth
 * @version 1.0.0
 */

/**
 * @description
 * Vanilla Javascript Tabs
 *
 * @class
 * @param {string} options.elem - HTML id of the tabs container
 * @param {number} [options.open = 0] - Render the tabs with this item open
 */
const WrapperTabs = function (options) {
  const { elem } = options;
  const open = options.open || 0;
  const titleClass = 'js-wrapper-tabs__title';
  const activeClass = 'js-wrapper-tabs__title-active';
  const contentClass = 'js-wrapper-tabs__content';
  const tabsNum = elem.querySelectorAll(`.${titleClass}`).length;

  render();

  /**
   * Initial rendering of the tabs.
   */
  function render(n) {
    elem.addEventListener('click', onClick);

    const init = (n == null) ? checkTab(open) : checkTab(n);

    for (let i = 0; i < tabsNum; i++) {
      elem.querySelectorAll(`.${titleClass}`)[i].setAttribute('data-index', i);
      if (i === init) openTab(i);
    }
  }

  /**
   * Handle clicks on the tabs.
   *
   * @param {object} e - Element the click occured on.
   */
  function onClick(e) {
    if (e.target.className.indexOf(titleClass) === -1) return;
    e.preventDefault();
    openTab(e.target.getAttribute('data-index'));
  }

  /**
   * Hide all tabs and re-set tab titles.
   */
  function reset() {
    [].forEach.call(elem.querySelectorAll(`.${contentClass}`), (item) => {
      item.style.display = 'none';
    });

    [].forEach.call(elem.querySelectorAll(`.${titleClass}`), (item) => {
      item.className = removeClass(item.className, activeClass);
    });
  }

  /**
   * Utility function to remove the open class from tab titles.
   *
   * @param {string} str - Current class.
   * @param {string} cls - The class to remove.
   */
  function removeClass(str, cls) {
    const reg = new RegExp(`(\ )${cls}(\)`, 'g');
    return str.replace(reg, '');
  }

  /**
   * Utility function to remove the open class from tab titles.
   *
   * @param n - Tab to open.
   */
  function checkTab(n) {
    return (n < 0 || isNaN(n) || n > tabsNum) ? 0 : n;
  }

  /**
   * Opens a tab by index.
   *
   * @param {number} n - Index of tab to open. Starts at 0.
   *
   * @public
   */
  function openTab(n) {
    reset();

    const i = checkTab(n);

    elem.querySelectorAll(`.${titleClass}`)[i].className += ` ${activeClass}`;
    elem.querySelectorAll(`.${contentClass}`)[i].style.display = '';
  }

  /**
   * Updates the tabs.
   *
   * @param {number} n - Index of tab to open. Starts at 0.
   *
   * @public
   */
  function update(n) {
    destroy();
    reset();
    render(n);
  }

  /**
   * Removes the listeners from the tabs.
   *
   * @public
   */
  function destroy() {
    elem.removeEventListener('click', onClick);
  }

  return {
    open: openTab,
    update,
    destroy,
  };
};

export default WrapperTabs;
