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
                  <div class="btn-field restaurant-btn-field">
                      <button type="button" class="visible-icon">
                          <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0C4.73858 0 2.5 2.19788 2.5 4.90909V6.67582C2.24443 6.72779 2.02328 6.80048 1.82003 6.90216C1.19282 7.21593 0.68289 7.71659 0.363312 8.33239C0 9.03247 0 9.94892 0 11.7818V12.7636C0 14.5965 0 15.513 0.363312 16.2131C0.68289 16.8289 1.19282 17.3295 1.82003 17.6433C2.53307 18 3.46649 18 5.33333 18H9.66667C11.5335 18 12.4669 18 13.18 17.6433C13.8072 17.3295 14.3171 16.8289 14.6367 16.2131C15 15.513 15 14.5965 15 12.7636V11.7818C15 9.94892 15 9.03247 14.6367 8.33239C14.3171 7.71659 13.8072 7.21593 13.18 6.90216C12.9767 6.80048 12.7556 6.72779 12.5 6.67582V4.90909C12.5 2.19788 10.2614 0 7.5 0ZM10.8333 6.55003V4.90909C10.8333 3.10161 9.34095 1.63636 7.5 1.63636C5.65905 1.63636 4.16667 3.10161 4.16667 4.90909V6.55003C4.51051 6.54545 4.89635 6.54545 5.33333 6.54545H9.66667C10.1037 6.54545 10.4895 6.54545 10.8333 6.55003ZM5.83333 11.4545C5.83333 10.5508 6.57953 9.81818 7.5 9.81818C8.42047 9.81818 9.16667 10.5508 9.16667 11.4545C9.16667 12.0602 8.8315 12.5891 8.33333 12.872V13.9091C8.33333 14.361 7.96024 14.7273 7.5 14.7273C7.03976 14.7273 6.66667 14.361 6.66667 13.9091V12.872C6.1685 12.5891 5.83333 12.0602 5.83333 11.4545Z" fill="#7C7E92" fill-opacity="0.5"></path>
                          </svg>
                          <div class="visible-cross"></div>
                      </button>
                      <button type="button" class="delete-icon">
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.08478 1.02618H9.92598V1.50426H10.952V0.959259C10.9522 0.430344 10.5221 0 9.99342 0H7.01733C6.48868 0 6.05859 0.430344 6.05859 0.959259V1.50426H7.08478V1.02618Z" fill="#7C7E92" fill-opacity="0.5"></path>
                              <path d="M13.3213 5.56982H3.68876C3.42482 5.56982 3.21704 5.79498 3.23832 6.05814L4.04362 16.016C4.0885 16.5719 4.55217 17 5.10923 17H11.9007C12.4578 17 12.9214 16.5719 12.9663 16.0158L13.7716 6.05814C13.793 5.79498 13.5852 5.56982 13.3213 5.56982ZM6.02115 15.9379C6.01039 15.9385 5.99962 15.9389 5.98899 15.9389C5.71999 15.9389 5.49418 15.7295 5.47745 15.4574L4.97279 7.28251C4.95541 6.99963 5.17058 6.75619 5.45333 6.73881C5.73516 6.72169 5.97965 6.93634 5.99703 7.21935L6.50156 15.3942C6.51907 15.6771 6.3039 15.9204 6.02115 15.9379ZM9.02383 15.4258C9.02383 15.7091 8.79413 15.9388 8.51074 15.9388C8.22734 15.9388 7.99765 15.7091 7.99765 15.4258V7.25086C7.99765 6.96747 8.22734 6.73777 8.51074 6.73777C8.794 6.73777 9.02383 6.96747 9.02383 7.25086V15.4258ZM12.0373 7.28108L11.5554 15.4559C11.5395 15.7286 11.3133 15.9388 11.0438 15.9388C11.0337 15.9388 11.0234 15.9385 11.0132 15.938C10.7303 15.9213 10.5145 15.6785 10.5312 15.3956L11.0129 7.22064C11.0295 6.93777 11.2715 6.72195 11.5552 6.73868C11.8381 6.75528 12.0539 6.99821 12.0373 7.28108Z" fill="#7C7E92" fill-opacity="0.5"></path>
                              <path d="M15.0957 3.98628L14.7588 2.97618C14.6699 2.70991 14.4206 2.53027 14.1398 2.53027H2.87037C2.5897 2.53027 2.34028 2.70991 2.25157 2.97618L1.91461 3.98628C1.84963 4.18109 1.93419 4.37979 2.09204 4.47888C2.15637 4.51922 2.2325 4.54347 2.31616 4.54347H14.6942C14.7778 4.54347 14.8541 4.51922 14.9183 4.47875C15.0761 4.37966 15.1607 4.18096 15.0957 3.98628Z" fill="#7C7E92" fill-opacity="0.5"></path>
                          </svg>
                      </button>

                  </div>

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
