/* eslint-disable no-unused-vars */
export default class Accordion {
  constructor() {
    this.accordions = Array.from(document.querySelectorAll('.accordion'));
    this.tabletAccordions = Array.from(document.querySelectorAll('.accordion-tablet'));
    this.windowWidth = window.innerWidth;
    this.phone = 480;
    this.tablet = 980;
  }

  initAccordions() {
    if (this.tabletAccordions.length > 0 && this.windowWidth <= this.tablet) {
      this.tabletAccordions.forEach((accordion) => {
        const btn = accordion.querySelector('.accordion-tablet-btn');
        let opened = false;
        btn.addEventListener('click', () => {
          if (opened) {
            accordion.classList.remove('opened');
            opened = false;
            return;
          }
          accordion.classList.add('opened');
          opened = true;
        });
      });
    }
    if (this.accordions.length > 0 && this.windowWidth <= this.phone) {
      this.accordions.forEach((accordion) => {
        const btn = accordion.querySelector('.accordion-btn');
        const content = accordion.querySelector('.accordion-content');
        let opened = false;
        btn.addEventListener('click', () => {
          if (opened) {
            accordion.classList.remove('opened');
            opened = false;
            return;
          }
          accordion.classList.add('opened');
          opened = true;
        });
      });
    }
  }

  init() {
    this.initAccordions();
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.initAccordions();
    });
  }
}
