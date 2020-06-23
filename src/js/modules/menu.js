
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
export default class Menu {
  constructor() {
    this.menu = document.querySelector('.menu');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.pageTitle = document.querySelector('.pages-h1');
    this.navMenu = document.querySelector('.menu-list');
    this.mobileNavMenu = document.querySelector('.mobile-menu-list');
    this.mobileMenuItems = this.mobileNavMenu ? Array.from(document.querySelectorAll('.mobile-list-item')) : '';
    this.menuItems = this.navMenu ? Array.from(this.navMenu.querySelectorAll('.list-item')) : '';
    this.desktop = 980;
    this.phone = 480;
    this.windowWidth = window.innerWidth;
    this.menuOpened = false;
    this.initialX = null;
    this.initialY = null;
    this.darkerWrapper = document.querySelector('.darker-wrapper');
    this.submenuWrappers = Array.from(document.querySelectorAll('.submenu-list-item'));
    this.mainContainer = document.querySelector('.container-main');
    this.windowWidth = window.innerWidth;
    this.phone = 480;
    this.mobMenuHeaders = Array.from(document.querySelectorAll('.mobile-menu-header'));
  }

  handleWindowWidth() {
    if (this.windowWidth <= this.desktop && this.windowWidth > this.phone) {
      if (this.menu) {
        this.openMenu();
      }
    } else if (this.windowWidth <= this.phone && this.mobMenuHeaders) {
      this.mobileMenuHandler();
    }
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= this.desktop && this.windowWidth > this.phone) {
        if (this.menu) {
          this.menu.classList.remove('opened-mobile');
          this.openMenu();
          document.body.style.height = '';
          document.body.style.overflow = '';
        }
      } else if (this.windowWidth <= this.phone && this.mobMenuHeaders) {
        this.mobileMenuHandler();
      }
    });
  }

  mobileMenuHandler() {
    this.mobMenuHeaders.forEach((header) => {
      const openBtn = header.querySelector('.mobile-menu-opening-btn');
      let isOpened = false;
      openBtn.addEventListener('click', () => {
        if (!isOpened) {
          openBtn.classList.add('menu-opened');
          this.menu.classList.add('opened-mobile');
          document.body.style.height = '100vh';
          document.body.style.overflow = 'hidden';
          isOpened = true;
          this.menu.style.top = `${window.pageYOffset}px`;
          header.classList.add('opened-mobile-menu');
          return;
        }
        openBtn.classList.remove('menu-opened');
        this.menu.classList.remove('opened-mobile');
        document.body.style.height = '';
        document.body.style.overflow = '';
        header.classList.remove('opened-mobile-menu');
        isOpened = false;
      });
    });
  }

  setHeight(elem) {
    if (elem && this.windowWidth > this.phone) {
      const siteHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      if (siteHeight > windowHeight) {
        elem.style.height = `${siteHeight}px`;
        return;
      }
      elem.style.height = `${windowHeight}px`;
    }
  }


  openMenu() {
    this.menu.addEventListener('touchstart', (e) => {
      this.initialX = e.touches[0].clientX;
      this.initialY = e.touches[0].clientY;
    }, false);

    this.menu.addEventListener('touchmove', (e) => {
      if (this.initialX === null) {
        return;
      }

      if (this.initialY === null) {
        return;
      }

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;

      const diffX = this.initialX - currentX;
      const diffY = this.initialY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && this.menuOpened) {
          this.menu.classList.add('closed');
          this.darkerWrapper.classList.remove('show');
          this.darkerWrapper.style.height = '0';
          this.menuOpened = false;
        } else if (diffX <= 0 && !this.menuOpened) {
          this.menu.classList.remove('closed');
          this.darkerWrapper.classList.add('show');
          this.setHeight(this.darkerWrapper);
          this.menuOpened = true;
        }
      }

      this.initialX = null;
      this.initialY = null;

      e.preventDefault();
    }, false);
  }

  setActiveItem() {
    if (this.menu && this.pageTitle) {
      const page = this.pageTitle.innerText.toLowerCase();
      // eslint-disable-next-line no-restricted-syntax
      for (const item of this.menuItems) {
        const navItemText = item.querySelector('.nav-link-text').innerText.toLowerCase();
        if (page === navItemText) {
          item.classList.add('active');
        }
      }
    }

    if (this.mobileMenu && this.pageTitle) {
      const page = this.pageTitle.innerText.toLowerCase();
      // eslint-disable-next-line no-restricted-syntax
      for (const item of this.mobileMenuItems) {
        const navItemText = item.querySelector('.mobile-nav-link-text').dataset.page.toLowerCase();
        if (page === navItemText) {
          item.classList.add('active');
        }
      }
    }
  }

  openSubmenu() {
    if (this.submenuWrappers) {
      this.submenuWrappers.forEach((wrapper) => {
        wrapper.addEventListener('click', () => {
          if (this.menuOpened || this.windowWidth <= this.phone) {
            wrapper.classList.toggle('open');
          } else {
            wrapper.classList.toggle('open-on-closed-menu');
          }
        });
      });
    }
  }

  init() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });

    this.handleWindowWidth();
    this.setActiveItem();
    this.openSubmenu();
  }
}
