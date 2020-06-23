/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
export default class RestaurantManagement {
  constructor() {
    this.restaurantsWrapper = document.querySelector('.restaurant-list');
    this.addAreaBtns = Array.from(document.querySelectorAll('.add-area-btn'));
    this.addTablesBtns = Array.from(document.querySelectorAll('.add-table-btn'));
    this.disInpWraps = Array.from(document.querySelectorAll('.disabling-input-wrapper'));
    this.wrapper = document.querySelector('.restaurant-management-list-content');
    this.typeOfPaymentBtnsWrapper = document.querySelector('.type-of-payment');
    this.cardForm = document.querySelector('.restaurant-card-form-main');
  }


  menuLayout() {
    if (this.wrapper) {
      const menu = this.wrapper.querySelector('.restaurant-list-wrapper');
      const noMenu = this.wrapper.querySelector('.no-records-menu');
      const menuItemsWrapper = this.wrapper.querySelector('.restaurant-list');
      const menuItems = Array.from(menuItemsWrapper.querySelectorAll('.restaurant-list-item'));
      if (menuItems.length < 1) {
        noMenu.classList = 'no-records-menu';
        menu.classList = 'restaurant-list-wrapper light-card d-none';
      } else {
        noMenu.classList = 'no-records-menu d-none';
        menu.classList = 'restaurant-list-wrapper light-card';
      }
    }
  }

  handleTypeOfPaymentBtns() {
    if (this.typeOfPaymentBtnsWrapper) {
      const typeOfPayBtns = Array.from(this.typeOfPaymentBtnsWrapper.querySelectorAll('.type-of-payment-btn'));
      typeOfPayBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          btn.classList.toggle('selected');
        });
      });
    }
  }

  disableInput() {
    if (this.disInpWraps.length > 0) {
      this.disInpWraps.forEach((wrap) => {
        const checkbox = wrap.querySelector('.disabling-input-checkbox');
        const inputWrap = wrap.querySelector('.input-wrapper');
        const checkboxTrue = wrap.querySelector('.disabling-input-checkbox-true');

        checkbox.addEventListener('click', () => {
          if (checkbox.checked) {
            inputWrap.classList = 'input-wrapper disabled';
          }
        });

        checkboxTrue.addEventListener('click', () => {
          if (checkboxTrue.checked) {
            inputWrap.classList = 'input-wrapper';
          }
        });
      });
    }
  }

  restaurantActivation() {
    if (this.wrapper) {
      const restaurants = Array.from(this.restaurantsWrapper.querySelectorAll('.restaurant-list-item'));

      restaurants.forEach((item) => {
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

  deleteRestaurant() {
    if (this.restaurantsWrapper) {
      const restaurants = Array.from(this.restaurantsWrapper.querySelectorAll('.restaurant-list-item'));
      restaurants.forEach((restaurant) => {
        const deleteBtn = restaurant.querySelector('.delete-icon');
        const mobileDeleteBtn = restaurant.querySelector('.delete-btn');
        const deleteBtns = [deleteBtn, mobileDeleteBtn];

        for (const deleteButton of deleteBtns) {
          deleteButton.addEventListener('click', () => {
            restaurant.remove();
            this.menuLayout();
          });
        }
      });
    }
  }

  addArea() {
    if (this.addAreaBtns.length > 0) {
      this.addAreaBtns.forEach((addBtn) => {
        addBtn.addEventListener('click', () => {
          const area = document.createElement('li');
          const { value } = document.querySelector('input[name="area"]:checked');
          area.classList = 'delivery-areas-item';
          area.innerHTML = `<span class="delivery-areas-item-text">${value}</span>
          <i class="delivery-areas-item-del">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L9 9M9 1L1 9" stroke="#7C7E92"/>
            </svg> </i>`;
          const delArDes = document.querySelector('.delivery-areas-desktop');
          const delArTab = document.querySelector('.dilevery-areas-tablet');
          const mobArea = area.cloneNode(true);
          const delareaBtn = area.querySelector('.delivery-areas-item-del');
          const delareaBtnMob = mobArea.querySelector('.delivery-areas-item-del');

          if (delArDes) {
            delArDes.appendChild(area);
          }

          if (delArTab) {
            delArTab.appendChild(mobArea);
          }

          delareaBtn.addEventListener('click', () => {
            area.remove();
            mobArea.remove();
          });

          delareaBtnMob.addEventListener('click', () => {
            area.remove();
            mobArea.remove();
          });
        });
      });
    }
  }

  addTableItem() {
    if (this.addTablesBtns.length > 0) {
      this.addTablesBtns.forEach((addBtn) => {
        addBtn.addEventListener('click', () => {
          const tableItem = document.createElement('ul');
          tableItem.classList = 'reset-list-styles restaurant-tables-item';
          tableItem.innerHTML = `
            <li class="checkbox">
              <div class="checkbox-wrapper">
                <div class="custom-checkbox-wrapper">
                  <input class="styled-checkbox" id="styled-checkbox-restaurant-tables1-mob" type="checkbox"
                    value="value0">
                  <label for="styled-checkbox-restaurant-tables1-mob"></label>
                </div>

              </div>
            </li>
            <li class="zone">
              <label class="zone-label">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.2961 13.1238L1.89384 9.72151L10.1228 1.49255L13.5251 4.89481L5.2961 13.1238ZM1.57582 10.3208L4.69679 13.4418L0.0175781 15L1.57582 10.3208ZM14.5715 3.85287L13.9814 4.44299L10.5746 1.03623L11.1647 0.446105C11.7592 -0.148702 12.7232 -0.148702 13.3176 0.446105L14.5715 1.70001C15.1616 2.29643 15.1616 3.25662 14.5715 3.85287Z"
                    fill="#7C7E92" />
                </svg>

                <input type="text" name="zone" value="-">


              </label>
            </li>
            <li class="table-number">
              <label class="table-number-label">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.2961 13.1238L1.89384 9.72151L10.1228 1.49255L13.5251 4.89481L5.2961 13.1238ZM1.57582 10.3208L4.69679 13.4418L0.0175781 15L1.57582 10.3208ZM14.5715 3.85287L13.9814 4.44299L10.5746 1.03623L11.1647 0.446105C11.7592 -0.148702 12.7232 -0.148702 13.3176 0.446105L14.5715 1.70001C15.1616 2.29643 15.1616 3.25662 14.5715 3.85287Z"
                    fill="#7C7E92" />
                </svg>
                <input type="text" value="455" name="table-number">
              </label>
            </li>
            <li class="qr-code">
              <div class="img-load restaurant-logo">
                <label for="qrCode1-mob">
                  <button type="button" class="add-btn">

                    <span class="add-btn-img">+</span>
                  </button>
                  <input type="file" id="qrCode1-mob" class="d-none">
                  <button class="img-delete-btn d-none">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.41754 0.784729H7.59022V1.15031H8.37485V0.733551C8.37495 0.329086 8.04607 0 7.6418 0H5.36597C4.9617 0 4.63281 0.329086 4.63281 0.733551V1.15031H5.41754V0.784729Z"
                        fill="#E3B100" />
                      <path
                        d="M10.1873 4.25928H2.82119C2.61936 4.25928 2.46047 4.43146 2.47673 4.6327L3.09255 12.2475C3.12687 12.6726 3.48145 13 3.90743 13H9.10091C9.5269 13 9.88147 12.6726 9.91579 12.2474L10.5316 4.6327C10.548 4.43146 10.3891 4.25928 10.1873 4.25928ZM4.60478 12.1878C4.59655 12.1883 4.58832 12.1886 4.58019 12.1886C4.37448 12.1886 4.20181 12.0284 4.18901 11.8203L3.8031 5.56898C3.7898 5.35266 3.95435 5.1665 4.17056 5.15321C4.38609 5.14011 4.57305 5.30426 4.58634 5.52068L4.97215 11.772C4.98554 11.9883 4.821 12.1744 4.60478 12.1878ZM6.90095 11.7962C6.90095 12.0128 6.7253 12.1885 6.50858 12.1885C6.29187 12.1885 6.11622 12.0128 6.11622 11.7962V5.54478C6.11622 5.32806 6.29187 5.15241 6.50858 5.15241C6.7252 5.15241 6.90095 5.32806 6.90095 5.54478V11.7962ZM9.20535 5.56789L8.83689 11.8192C8.82469 12.0277 8.65171 12.1885 8.44561 12.1885C8.43788 12.1885 8.43004 12.1883 8.4222 12.1879C8.20589 12.1751 8.04085 11.9894 8.05364 11.7731L8.42201 5.52167C8.4347 5.30535 8.61978 5.14031 8.83669 5.15311C9.053 5.1658 9.21804 5.35157 9.20535 5.56789Z"
                        fill="#E3B100" />
                      <path
                        d="M11.5438 3.04848L11.2861 2.27605C11.2182 2.07243 11.0275 1.93506 10.8128 1.93506H2.19499C1.98036 1.93506 1.78963 2.07243 1.72179 2.27605L1.46411 3.04848C1.41442 3.19745 1.47909 3.3494 1.59979 3.42517C1.64899 3.45602 1.70721 3.47456 1.77118 3.47456H11.2367C11.3007 3.47456 11.359 3.45602 11.4081 3.42507C11.5288 3.3493 11.5935 3.19735 11.5438 3.04848Z"
                        fill="#E3B100" />
                    </svg>

                  </button>

                </label>
                <div class="qr-hover">
                  <svg width="22" height="32" viewBox="0 0 22 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21.8063 14.5804C21.7251 14.3757 21.5355 14.2421 21.3252 14.2421H15.6198V0.556713C15.6198 0.254538 15.3865 0.00927734 15.0991 0.00927734H6.76858C6.48118 0.00927734 6.24791 0.254538 6.24791 0.556713V14.2422H0.520671C0.310341 14.2422 0.120805 14.3758 0.0395817 14.5794C-0.0406161 14.7841 0.00311917 15.0195 0.152044 15.1761L10.5392 26.1332C10.6371 26.2361 10.7693 26.2942 10.9078 26.2942C11.0463 26.2942 11.1786 26.2361 11.2764 26.1343L21.6938 15.1772C21.8427 15.0206 21.8875 14.7852 21.8063 14.5804Z"
                      fill="#2DA82D" />
                    <rect x="1" y="31" width="19" height="1" rx="0.5" fill="#2DA82D" />
                  </svg>

                </div>
              </div>
            </li>
          `;
          const tableWrappers = document.querySelector('.restaurant-tables-item-wrapper-desk');
          const tableWrappersMob = document.querySelector('.restaurant-tables-items-wrapper-mob');

          if (tableWrappers) {
            tableWrappers.appendChild(tableItem);
          }

          if (tableWrappersMob) {
            tableWrappersMob.appendChild(tableItem.cloneNode(true));
          }
        });
      });
    }
  }

  openingHoursCheckbox() {
    if (this.cardForm) {
      const openingHoursBlocks = Array.from(document.querySelectorAll('.restaurant-opening-hours'));
      openingHoursBlocks.forEach((openingHourBlock) => {
        const items = Array.from(openingHourBlock.querySelectorAll('.restaurant-opening-hours-item'));
        items.forEach((item) => {
          const checkbox = item.querySelector('.styled-checkbox');
          checkbox.addEventListener('click', () => {
            if (!checkbox.checked) {
              item.classList.add('disabled');
              return;
            }
            item.classList.remove('disabled');
          });
        });
      });
    }
  }

  init() {
    this.deleteRestaurant();
    this.addArea();
    this.addTableItem();
    this.disableInput();
    this.menuLayout();
    this.handleTypeOfPaymentBtns();
    this.restaurantActivation();
    this.openingHoursCheckbox();
  }
}
