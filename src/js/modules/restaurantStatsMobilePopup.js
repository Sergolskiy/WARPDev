/* eslint-disable no-param-reassign */
export default class RestaurantStatsMobilePopup {
  constructor() {
    this.restaurantItems = Array.from(document.querySelectorAll('.restaurant-stats-table-item'));
    this.popUp = document.querySelector('.restaurant-stats-mobile-pop-up');
    this.darkerWrapper = document.querySelector('.darker-wrapper');
    this.windowWidth = window.innerWidth;
    this.phone = 480;
    this.item = '';
  }

  openPopup() {
    if (this.restaurantItems.length > 0 && this.popUp) {
      this.restaurantItems.forEach((item) => {
        this.item = item;
        if (this.windowWidth <= this.phone) {
          this.item.addEventListener('click', this.handlePopUpOpen);
        } else {
          this.item.removeEventListener('click', this.handlePopUpOpen);
        }
      });
    }
  }

  handlePopUpOpen() {
    const darkerWrapper = document.querySelector('.darker-wrapper');
    const popUp = document.querySelector('.restaurant-stats-mobile-pop-up');
    const popUpName = popUp.querySelector('.name');
    const popUpNumberOfOrders = popUp.querySelector('.number-of-orders');
    const popUpReviews = popUp.querySelector('.reviews');
    const popUpAmount = popUp.querySelector('.amount');
    const closeBtn = popUp.querySelector('.close-btn');

    popUpName.innerText = this.querySelector('.restaurant-name').innerText;
    popUpNumberOfOrders.innerText = this.querySelector('.restaurant-number-orders').innerText;
    popUpReviews.innerText = this.querySelector('.restaurant-reviews').innerText;
    popUpAmount.innerText = this.querySelector('.restaurant-amount').innerText;

    popUp.classList.remove('d-none');
    darkerWrapper.classList.add('show');
    function setHeight(elem) {
      if (elem) {
        const siteHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        if (siteHeight > windowHeight) {
          elem.style.height = `${siteHeight}px`;
          return;
        }
        elem.style.height = `${windowHeight}px`;
      }
    }
    setHeight(darkerWrapper);

    closeBtn.addEventListener('click', () => {
      popUp.classList.add('d-none');
      darkerWrapper.classList.remove('show');
      darkerWrapper.style.height = '0';
    });
  }


  init() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.openPopup();
    });
    this.openPopup();
  }
}
