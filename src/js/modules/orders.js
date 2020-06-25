/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

export default class Orders {
  constructor() {
    this.ordersPage = document.querySelector('.orders');
    this.ordersTables = Array.from(document.querySelectorAll('.orders-table'));
    this.ordersTabsInner = this.ordersPage ? Array.from(document.querySelectorAll('.js-tabs__content')) : '';
    this.orders = Array.from(document.querySelectorAll('.orders-table-list'));
    this.orderType = '';
    this.deliveryPopUp = document.querySelector('.delivery-order-pop-up');
    this.restaurantPopUp = document.querySelector('.restaurant-order-pop-up');
    this.takeAwayPopUp = document.querySelector('.take-away-order-pop-up');
    this.darkerWrapper = document.querySelector('.darker-wrapper');
    this.windowWidth = window.innerWidth;
    this.completedTab = document.querySelector('.completed-tab');
    this.tabs = this.ordersPage ? this.ordersPage.querySelector('.js-tabs__header') : '';
    this.isOnCompletedTab = false;
    this.ordersInteraction = document.querySelector('.orders-interaction');
    this.completedOrdersInteraction = document.querySelector('.completed-orders-interaction');
    this.deliveryOutsideClick = {};
    this.restaurantOutsideClick = {};
    this.takeAwayOutsideClick = {};
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

  detectCompletedTab() {
    if (this.tabs) {
      const tabsItems = Array.from(this.tabs.querySelectorAll('.js-tabs__title'));
      tabsItems.forEach((tabsItem) => {
        tabsItem.addEventListener('click', () => {
          if (tabsItem.classList.contains('completed-tab')) {
            this.isOnCompletedTab = true;
          } else {
            this.isOnCompletedTab = false;
          }
        });
      });
    }
  }

  switchPayment(popUp) {
    const btnsWrapper = popUp.querySelector('.pop-up-payment-status');
    const paidBtn = btnsWrapper.querySelector('.paid');
    const unpaidBtn = btnsWrapper.querySelector('.unpaid');

    paidBtn.addEventListener('click', () => {
      paidBtn.classList = 'paid selected';
      unpaidBtn.classList = 'unpaid';
    });

    unpaidBtn.addEventListener('click', () => {
      paidBtn.classList = 'paid';
      unpaidBtn.classList = 'unpaid selected';
    });
  }

  openPopUp() {
    // if (this.orders) {
    //   this.orders.forEach((order) => {
    //     order.addEventListener('click', (e) => {
    //       const deliveryPopUpClickPrevLater = this.deliveryPopUp.querySelector('.click-prevent-layer');
    //       const restaurantPopUpClickPrevLater = this.restaurantPopUp.querySelector('.click-prevent-layer');
    //       const takeAwayPopUpClickPrevLater = this.takeAwayPopUp.querySelector('.click-prevent-layer');
    //       const addIngredientBtnDelivery = this.deliveryPopUp.querySelector('.pop-up-add-ingredient-btn-wrapper');
    //       const addIngredientBtnRestaurant = this.restaurantPopUp.querySelector('.pop-up-add-ingredient-btn-wrapper');
    //       const addIngredientBtnTakeAway = this.takeAwayPopUp.querySelector('.pop-up-add-ingredient-btn-wrapper');
    //
    //       if (this.ordersInteraction) {
    //         const delayBtn = this.ordersInteraction.querySelector('.delay-orders-btn button');
    //         const submenu = this.ordersInteraction.querySelector('.delay-submenu');
    //         submenu.classList.remove('opened');
    //         delayBtn.parentNode.classList.remove('activated');
    //       }
    //
    //       if (this.isOnCompletedTab) {
    //         restaurantPopUpClickPrevLater.classList.add('active');
    //         deliveryPopUpClickPrevLater.classList.add('active');
    //         takeAwayPopUpClickPrevLater.classList.add('active');
    //         addIngredientBtnDelivery.style.display = 'none';
    //         addIngredientBtnRestaurant.style.display = 'none';
    //         addIngredientBtnTakeAway.style.display = 'none';
    //         this.deliveryPopUp.classList.add('completed-pop-up');
    //         this.restaurantPopUp.classList.add('completed-pop-up');
    //         this.takeAwayPopUp.classList.add('completed-pop-up');
    //       } else {
    //         restaurantPopUpClickPrevLater.classList.remove('active');
    //         deliveryPopUpClickPrevLater.classList.remove('active');
    //         takeAwayPopUpClickPrevLater.classList.remove('active');
    //         addIngredientBtnDelivery.style.display = 'block';
    //         addIngredientBtnRestaurant.style.display = 'block';
    //         addIngredientBtnTakeAway.style.display = 'block';
    //         this.deliveryPopUp.classList.remove('completed-pop-up');
    //         this.restaurantPopUp.classList.remove('completed-pop-up');
    //         this.takeAwayPopUp.classList.remove('completed-pop-up');
    //       }
    //       this.orderType = order.querySelector('.order-type').innerText;
    //       const checkbox = [order.querySelector('.styled-checkbox'), order.querySelector('.custom-checkbox-wrapper'), order.querySelector('.custom-checkbox-wrapper label'),
    //         order.querySelector('.order-expand-btn'),
    //         order.querySelector('.order-expand-btn button'),
    //         order.querySelector('.order-expand-btn button svg'),
    //         order.querySelector('.order-expand-btn button svg path')];
    //
    //       if (!checkbox.includes(e.target)) {
    //         if (this.orderType === 'Delivery') {
    //           document.removeEventListener('click', this.restaurantOutsideClick);
    //           document.removeEventListener('click', this.takeAwayOutsideClick);
    //           this.deliveryPopUp.classList.remove('d-none');
    //           this.darkerWrapper.classList.add('show');
    //           this.setHeight(this.darkerWrapper);
    //           const closeBtn = this.deliveryPopUp.querySelector('.pop-up-close-btn');
    //           this.switchPayment(this.deliveryPopUp);
    //
    //           this.deliveryOutsideClick = (event) => {
    //             let isClickInside = false;
    //             if (this.deliveryPopUp.contains(event.target) || event.target.classList.contains('select-ingredient-list-item') || event.target.classList.contains('click-prevent-layer')) {
    //               isClickInside = true;
    //             }
    //
    //             this.orders.forEach((orderC) => {
    //               if (orderC.contains(event.target)) {
    //                 isClickInside = true;
    //               }
    //             });
    //
    //             if (!isClickInside) {
    //               this.deliveryPopUp.classList.add('d-none');
    //               this.darkerWrapper.classList.remove('show');
    //               this.darkerWrapper.style.height = '0';
    //               const addedItems = Array.from(this.deliveryPopUp.querySelectorAll('.pop-up-added-order-item'));
    //               if (addedItems.length > 0) {
    //                 addedItems.forEach((addedItem) => {
    //                   addedItem.remove();
    //                 });
    //               }
    //             }
    //           };
    //
    //           document.addEventListener('click', this.deliveryOutsideClick);
    //           closeBtn.addEventListener('click', () => {
    //             this.deliveryPopUp.classList.add('d-none');
    //             this.darkerWrapper.classList.remove('show');
    //             this.darkerWrapper.style.height = '0';
    //             const addedItems = Array.from(this.deliveryPopUp.querySelectorAll('.pop-up-added-order-item'));
    //             if (addedItems.length > 0) {
    //               addedItems.forEach((addedItem) => {
    //                 addedItem.remove();
    //               });
    //             }
    //           });
    //         } else if (this.orderType === 'Restaurant') {
    //           document.removeEventListener('click', this.deliveryOutsideClick);
    //           document.removeEventListener('click', this.takeAwayOutsideClick);
    //           this.restaurantPopUp.classList.remove('d-none');
    //           this.darkerWrapper.classList.add('show');
    //           this.setHeight(this.darkerWrapper);
    //           const closeBtn = this.restaurantPopUp.querySelector('.pop-up-close-btn');
    //           this.switchPayment(this.restaurantPopUp);
    //
    //           this.restaurantOutsideClick = (event) => {
    //             let isClickInside = false;
    //             if (this.restaurantPopUp.contains(event.target) || event.target.classList.contains('select-ingredient-list-item') || event.target.classList.contains('click-prevent-layer')) {
    //               isClickInside = true;
    //             }
    //
    //             this.orders.forEach((orderC) => {
    //               if (orderC.contains(event.target)) {
    //                 isClickInside = true;
    //               }
    //             });
    //
    //             if (!isClickInside) {
    //               this.restaurantPopUp.classList.add('d-none');
    //               this.darkerWrapper.classList.remove('show');
    //               this.darkerWrapper.style.height = '0';
    //               const addedItems = Array.from(this.restaurantPopUp.querySelectorAll('.pop-up-added-order-item'));
    //               if (addedItems.length > 0) {
    //                 addedItems.forEach((addedItem) => {
    //                   addedItem.remove();
    //                 });
    //               }
    //             }
    //           };
    //           document.addEventListener('click', this.restaurantOutsideClick);
    //           closeBtn.addEventListener('click', () => {
    //             this.restaurantPopUp.classList.add('d-none');
    //             this.darkerWrapper.classList.remove('show');
    //             this.darkerWrapper.style.height = '0';
    //             const addedItems = Array.from(this.restaurantPopUp.querySelectorAll('.pop-up-added-order-item'));
    //             if (addedItems.length > 0) {
    //               addedItems.forEach((addedItem) => {
    //                 addedItem.remove();
    //               });
    //             }
    //           });
    //         } else if (this.orderType === 'Take away') {
    //           document.removeEventListener('click', this.deliveryOutsideClick);
    //           document.removeEventListener('click', this.restaurantOutsideClick);
    //           this.takeAwayPopUp.classList.remove('d-none');
    //           this.darkerWrapper.classList.add('show');
    //           this.setHeight(this.darkerWrapper);
    //           const closeBtn = this.takeAwayPopUp.querySelector('.pop-up-close-btn');
    //           this.switchPayment(this.takeAwayPopUp);
    //
    //           this.takeAwayOutsideClick = (event) => {
    //             let isClickInside = false;
    //
    //             if (this.takeAwayPopUp.contains(event.target) || event.target.classList.contains('select-ingredient-list-item') || event.target.classList.contains('click-prevent-layer')) {
    //               isClickInside = true;
    //             }
    //
    //             this.orders.forEach((orderC) => {
    //               if (orderC.contains(event.target)) {
    //                 isClickInside = true;
    //               }
    //             });
    //
    //             if (!isClickInside) {
    //               this.takeAwayPopUp.classList.add('d-none');
    //               this.darkerWrapper.classList.remove('show');
    //               this.darkerWrapper.style.height = '0';
    //               const addedItems = Array.from(this.takeAwayPopUp.querySelectorAll('.pop-up-added-order-item'));
    //               if (addedItems.length > 0) {
    //                 addedItems.forEach((addedItem) => {
    //                   addedItem.remove();
    //                 });
    //               }
    //             }
    //           };
    //           document.addEventListener('click', this.takeAwayOutsideClick);
    //           closeBtn.addEventListener('click', () => {
    //             this.takeAwayPopUp.classList.add('d-none');
    //             this.darkerWrapper.classList.remove('show');
    //             this.darkerWrapper.style.height = '0';
    //             const addedItems = Array.from(this.takeAwayPopUp.querySelectorAll('.pop-up-added-order-item'));
    //             if (addedItems.length > 0) {
    //               addedItems.forEach((addedItem) => {
    //                 addedItem.remove();
    //               });
    //             }
    //           });
    //         }
    //       }
    //     });
    //   });
    // }
  }

  ordersDelay() {
    if (this.ordersInteraction) {
      const delayBtn = this.ordersInteraction.querySelector('.delay-orders-btn button');
      delayBtn.addEventListener('click', () => {
        const submenu = this.ordersInteraction.querySelector('.delay-submenu');
        submenu.classList.toggle('opened');
        delayBtn.parentNode.classList.toggle('activated');
      });
    }
  }

  deleteOrder() {
    if (this.ordersInteraction) {
      const deleteBtn = this.ordersInteraction.querySelector('.delete-orders-btn');
      const multiselectTable = document.querySelector('.multiselect-table-orders');
      deleteBtn.addEventListener('click', () => {
        const checkboxes = Array.from(multiselectTable.querySelectorAll('.selected-by-multiselect'));
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            checkbox.closest('.orders-table-list').remove();
          }
        });
      });
    }
  }

  deleteCompletedOrder() {
    if (this.completedOrdersInteraction) {
      const deleteBtn = this.completedOrdersInteraction.querySelector('.delete-orders-btn');
      const multiselectTable = document.querySelector('.multiselect-completed-orders-table');
      deleteBtn.addEventListener('click', () => {
        const checkboxes = Array.from(multiselectTable.querySelectorAll('.selected-by-multiselect'));
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            checkbox.closest('.orders-table-list').remove();
          }
        });
      });
    }
  }

  expandOrder() {
    if (this.ordersTables.length > 0) {
      this.ordersTables.forEach((table) => {
        const orders = Array.from(table.querySelectorAll('.orders-table-list'));
        orders.forEach((order) => {
          const expandBtn = order.querySelector('.order-expand-btn');
          const orderItems = order.querySelector('.order').children;
          if (orderItems.length > 3) {
            expandBtn.classList.remove('d-none');
          } else if (orderItems.length <= 3 && !expandBtn.classList.contains('d-none')) {
            expandBtn.classList.add('d-none');
          }

          expandBtn.addEventListener('click', () => {
            expandBtn.closest('.orders-table-list').classList.toggle('not-extended');
          });
        });
      });
    }
  }

  sortPagination() {
    if (this.ordersTabsInner.length > 0) {
      this.ordersTabsInner.forEach((table) => {
        const wrapper = table.querySelector('.sort-pagination');
        if (wrapper) {
          const btnUp = wrapper.querySelector('.sort-pagination-up');
          const btnDown = wrapper.querySelector('.sort-pagination-down');

          btnUp.addEventListener('click', () => {
            btnUp.classList.add('activated');
            btnDown.classList.remove('activated');
          });

          btnDown.addEventListener('click', () => {
            btnDown.classList.add('activated');
            btnUp.classList.remove('activated');
          });
        }
      });
    }
  }

  init() {
    this.detectCompletedTab();
    this.openPopUp();
    this.ordersDelay();
    this.deleteOrder();
    this.deleteCompletedOrder();
    this.expandOrder();
    this.sortPagination();
  }
}
