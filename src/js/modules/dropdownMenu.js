/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
export default class DropdownMenu {
  constructor() {
    this.menuWrappers = Array.from(document.querySelectorAll('.dropdown-menu-wrapper'));
    this.opened = false;
    this.restaurantSubmenuWraper = Array.from(document.querySelectorAll('.restaurant-phone-menu'));
  }

  openMenu() {
    if (this.menuWrappers) {
      this.menuWrappers.forEach((menuWrapper) => {
        const openBtn = menuWrapper.querySelector('.dropdown-opener');
        openBtn.addEventListener('click', () => {
          const menu = menuWrapper.querySelector('.dropdown-menu');
          const menuItems = Array.from(menuWrapper.querySelectorAll('.dropdown-menu-item'));
          if (!this.opened) {
            menu.classList.add('show');
            this.opened = true;
            menu.addEventListener('click', () => {
              this.closeMenu(menu);
            });
            return;
          }

          this.closeMenu(menu);
        });
      });
    }
  }

  closeMenu(menu) {
    menu.classList.remove('show');
    this.opened = false;
  }

  openRestaurantSubmenu() {
    if (this.restaurantSubmenuWraper) {
      this.restaurantSubmenuWraper.forEach((restaurantSubmenuWraper, index) => {
        const openBtn = restaurantSubmenuWraper.querySelector('.restaurant-phone-menu-icon');
        openBtn.addEventListener('click', () => {
          restaurantSubmenuWraper.classList.toggle('open');
          for (let i = 0; i < this.restaurantSubmenuWraper.length; i++) {
            if (i !== index) {
              this.restaurantSubmenuWraper[i].classList.remove('open');
            }
          }
        });
      });
    }
  }

  init() {
    this.openMenu();
    this.openRestaurantSubmenu();
  }
}
