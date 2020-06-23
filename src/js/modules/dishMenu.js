/* eslint-disable no-param-reassign */

export default class DishMenu {
  constructor() {
    this.wrapper = document.querySelector('.menu-management-content');
  }

  menuLayout() {
    if (this.wrapper) {
      const menu = this.wrapper.querySelector('.menu-list-wrapper');
      const noMenu = this.wrapper.querySelector('.no-records-menu');
      const menuItemsWrapper = this.wrapper.querySelector('.menu-list-wrapper');
      const menuItems = Array.from(menuItemsWrapper.querySelectorAll('.menu-list-item'));
      if (menuItems.length < 1) {
        noMenu.classList = 'no-records-menu';
        menu.classList = 'menu-list-wrapper light-card d-none';
      } else {
        noMenu.classList = 'no-records-menu d-none';
        menu.classList = 'menu-list-wrapper light-card';
      }
    }
  }

  activeDish() {
    if (this.wrapper) {
      const menuItemsWrapper = this.wrapper.querySelector('.menu-list-wrapper');
      const menuItems = Array.from(menuItemsWrapper.querySelectorAll('.menu-list-item'));
      menuItems.forEach((menuItem) => {
        const inputs = Array.from(menuItem.querySelectorAll('input'));
        inputs.forEach((input) => {
          input.addEventListener('focus', () => {
            menuItem.classList.add('active');
          });
          input.addEventListener('blur', () => {
            menuItem.classList.remove('active');
          });
        });
      });
    }
  }

  dishActivation() {
    if (this.wrapper) {
      const menuItemsWrapper = this.wrapper.querySelector('.menu-list-wrapper');
      const menuItems = Array.from(menuItemsWrapper.querySelectorAll('.menu-list-item'));

      menuItems.forEach((item) => {
        const visibilityBtn = item.querySelector('.visible-icon');
        const mobileInteractionMenu = item.querySelector('.restaurant-phone-menu');
        const mobileVisibilityBtn = mobileInteractionMenu.querySelector('.visibility-action');
        let isActive = true;

        const activation = () => {
          if (isActive) {
            item.classList.add('inactive');
            isActive = false;
          } else {
            item.classList.remove('inactive');
            isActive = true;
          }
        };

        visibilityBtn.addEventListener('click', activation);
        mobileVisibilityBtn.addEventListener('click', activation);
      });
    }
  }

  dishDelete() {
    if (this.wrapper) {
      const menuItemsWrapper = this.wrapper.querySelector('.menu-list-wrapper');
      const menuItems = Array.from(menuItemsWrapper.querySelectorAll('.menu-list-item'));


      menuItems.forEach((item) => {
        const deleteBtn = item.querySelector('.delete-icon');
        const mobileInteractionMenu = item.querySelector('.restaurant-phone-menu');
        const mobileDeleteBtn = mobileInteractionMenu.querySelector('.delete-action');

        const deleteItem = () => {
          item.remove();
          this.menuLayout();
        };

        deleteBtn.addEventListener('click', deleteItem);
        mobileDeleteBtn.addEventListener('click', deleteItem);
      });
    }
  }

  init() {
    this.menuLayout();
    this.dishActivation();
    this.dishDelete();
    this.activeDish();
  }
}
