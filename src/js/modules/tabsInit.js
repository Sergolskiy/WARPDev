/* eslint-disable no-unused-vars */
import Tabs from './tabs';
import WrapperTabs from './wrapperTabs';

export default class TabsInit {
  constructor() {
    this.tabsList = Array.from(document.querySelectorAll('.js-tabs'));
    this.wrapperTabsList = Array.from(document.querySelectorAll('.js-wrapper-tabs'));
  }

  init() {
    if (this.tabsList) {
      this.tabsList.forEach((tab) => {
        const tabs = new Tabs({
          elem: tab,
          open: 0,
        });
      });
    }

    if (this.wrapperTabsList) {
      this.wrapperTabsList.forEach((tab) => {
        const tabs = new WrapperTabs({
          elem: tab,
          open: 0,
        });
      });
    }
  }
}
