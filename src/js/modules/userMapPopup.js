/* eslint-disable no-param-reassign */
import scrollControl from './scroll-lock';

export default class UserMapPopUp {
  constructor() {
    this.ordersPage = document.querySelector('.user-map');
    this.ordersTable = document.querySelector('.user-map-orders');
    this.orders = Array.from(document.querySelectorAll('.user-map-table-item'));
    this.orderType = '';
    this.deliveredPopup = document.querySelector('.user-map-delivered-order-pop-up');
    this.canceledPopup = document.querySelector('.user-map-canceled-order-pop-up');
    this.darkerWrapper = document.querySelector('.darker-wrapper');
    this.windowWidth = window.innerWidth;
  }

  setHeight(elem) {
    if (elem && this.windowWidth) {
      const siteHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      if (siteHeight > windowHeight) {
        elem.style.height = `${siteHeight}px`;
        return;
      }
      elem.style.height = `${windowHeight}px`;
    }
  }

  openPopUp() {
    if (this.orders) {
      this.orders.forEach((order) => {
        order.addEventListener('click', () => {
          this.orderType = order.querySelector('.status p').innerText;
          if (this.orderType === 'Delivered') {
            if (this.windowWidth <= 480) {
              this.deliveredPopup.classList.remove('animated');
              scrollControl.enable();
            }
            this.deliveredPopup.classList.remove('d-none');
            this.darkerWrapper.classList.add('show');
            this.setHeight(this.darkerWrapper);
            const closeBtns = Array.from(this.deliveredPopup.querySelectorAll('.pop-up-close-btn'));
            closeBtns.forEach((closeBtn) => {
              closeBtn.addEventListener('click', () => {
                if (this.windowWidth <= 480) {
                  this.deliveredPopup.classList.add('animated');
                  scrollControl.disable();
                }
                this.deliveredPopup.classList.add('d-none');
                this.darkerWrapper.classList.remove('show');
                this.darkerWrapper.style.height = '0';
              });
            });
          } else if (this.orderType === 'Cancelled') {
            if (this.windowWidth <= 480) {
              this.canceledPopup.classList.remove('animated');
              scrollControl.enable();
            }
            this.canceledPopup.classList.remove('d-none');
            this.darkerWrapper.classList.add('show');
            this.setHeight(this.darkerWrapper);
            const closeBtns = Array.from(this.canceledPopup.querySelectorAll('.pop-up-close-btn'));
            closeBtns.forEach((closeBtn) => {
              closeBtn.addEventListener('click', () => {
                if (this.windowWidth <= 480) {
                  scrollControl.disable();
                  this.canceledPopup.classList.add('animated');
                }
                this.canceledPopup.classList.add('d-none');
                this.darkerWrapper.classList.remove('show');
                this.darkerWrapper.style.height = '0';
              });
            });
          }
        });
      });
    }
  }

  init() {
    this.openPopUp();
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }
}
