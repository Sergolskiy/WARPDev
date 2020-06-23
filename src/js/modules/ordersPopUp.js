export default class OrdersPopUp {
  constructor() {
    this.orderStatusBtnsWrappers = Array.from(document.querySelectorAll('.pop-up-order-status-btns'));
    this.orderWrapper = Array.from(document.querySelectorAll('.pop-up-order-wrapper'));
    this.addIngredientBtns = Array.from(document.querySelectorAll('.pop-up-add-ingredient-btn-wrapper'));
  }

  addPortion() {
    if (this.orderWrapper) {
      this.orderWrapper.forEach((orderWrapper) => {
        const orders = Array.from(orderWrapper.querySelectorAll('.pop-up-order-item'));
        orders.forEach((order) => {
          const inputs = order.querySelectorAll('input');
          const btnsWrapper = order.querySelector('.pop-up-order-btns');
          if (btnsWrapper && inputs) {
            inputs.forEach((input) => {
              input.addEventListener('focus', () => {
                btnsWrapper.classList.add('show');
              });
            });

            const delBtn = btnsWrapper.querySelector('.del-btn-order');
            const addBtn = btnsWrapper.querySelector('.add-btn-order');

            const portionsQuantity = order.querySelector('.portion-quantity');

            delBtn.addEventListener('click', () => {
              if (Number(portionsQuantity.value) > 0) {
                const newPortionsQuantity = Number(portionsQuantity.value) - 1;
                portionsQuantity.value = newPortionsQuantity;
              }
            });

            addBtn.addEventListener('click', () => {
              const newPortionsQuantity = Number(portionsQuantity.value) + 1;
              portionsQuantity.value = newPortionsQuantity;
            });
          }
        });
      });
    }
  }

  activateStep() {
    if (this.orderStatusBtnsWrappers.length > 0) {
      this.orderStatusBtnsWrappers.forEach((orderStatusBtnsWrapper) => {
        const btns = Array.from(orderStatusBtnsWrapper.querySelectorAll('.btn-base'));
        const submitBtn = orderStatusBtnsWrapper.querySelector('.pop-up-submit-btn');
        submitBtn.addEventListener('click', () => {
          submitBtn.classList.add('activated');
          setTimeout(() => {
            submitBtn.classList.remove('activated');
          }, 160);
        });
        btns.forEach((btn) => {
          btn.addEventListener('click', () => {
            btn.classList.toggle('activated-btn');
          });
        });
      });
    }
  }

  addIngredient() {
    if (this.addIngredientBtns.length > 0) {
      this.addIngredientBtns.forEach((addBtn) => {
        addBtn.addEventListener('click', () => {
          const ordersList = addBtn.closest('.pop-up-content-item').querySelector('.pop-up-order-wrapper');
          const newItem = document.createElement('li');
          newItem.classList = 'pop-up-order-item pop-up-added-order-item';
          newItem.innerHTML = `<div class="ingredient no-padding custom-ingredient input-select-wrapper">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="#8A91AA"/>
            </svg>
            
        <input class="select-ingredient-input" type="text" name="dish" placeholder="Start typing">
        <ul class="reset-list-styles select-ingredient-list">
          <li class="select-ingredient-list-item"> Fish </li>
          <li class="select-ingredient-list-item"> Meat </li>
        </ul>
      </div>`;
          ordersList.appendChild(newItem);
          const input = newItem.querySelector('.select-ingredient-input');
          input.addEventListener('click', () => {
            const list = newItem.querySelector('.select-ingredient-list');
            list.classList.toggle('opened');
            const items = Array.from(list.querySelectorAll('.select-ingredient-list-item'));
            items.forEach((item) => {
              item.addEventListener('click', () => {
                const value = item.innerText;
                newItem.innerHTML = `<label class="ingredient">
                <input type="text" value="${value}">
                <i>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.27974 13.1237L1.87669 9.72149L10.1076 1.49255L13.5106 4.8948L5.27974 13.1237ZM1.5586 10.3208L4.6803 13.4418L0 15L1.5586 10.3208ZM14.5573 3.85286L13.967 4.44298L10.5595 1.03623L11.1498 0.446103C11.7443 -0.148701 12.7085 -0.148701 13.3031 0.446103L14.5573 1.7C15.1476 2.29643 15.1476 3.25661 14.5573 3.85286Z"
                      fill="#7C7E92" />
                  </svg>
                </i>
              </label>
              <label class="portion">
                <input type="text" value="1" name="portionQuantity" class="portion-quantity">
                <span>Por</span>
              </label>
              <div class="pop-up-order-btns">
                <button type="button" class="add-btn-order">
                  <span class="add-btn-img blue-color"><svg width="10" height="11" viewBox="0 0 10 11" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.2394 5.04999H5.63947V1.44997C5.63947 1.20163 5.43784 1 5.18941 1C4.94107 1 4.73944 1.20163 4.73944 1.44997V5.04999H1.13942C0.891079 5.04999 0.689453 5.25161 0.689453 5.49996C0.689453 5.74839 0.891079 5.95001 1.13942 5.95001H4.73944V9.54995C4.73944 9.79837 4.94107 10 5.18941 10C5.43784 10 5.63947 9.79837 5.63947 9.54995V5.95001H9.2394C9.48783 5.95001 9.68945 5.74839 9.68945 5.49996C9.68945 5.25161 9.48783 5.04999 9.2394 5.04999Z"
                        fill="#0009DA" stroke="#0009DA" stroke-width="0.5" />
                    </svg>
                  </span>
                </button>
                <button type="button" class="del-btn-order">
                  <span class="add-btn-img blue-color"><svg width="12" height="3" viewBox="0 0 12 3" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="10" height="1" rx="0.5" fill="#0009DA" stroke="#0009DA" stroke-width="0.5" />
                    </svg>
                  </span>
                </button>
              </div>`;
              });
            });
          });
        });
      });
    }
  }

  init() {
    this.activateStep();
    this.addPortion();
    this.addIngredient();
  }
}
