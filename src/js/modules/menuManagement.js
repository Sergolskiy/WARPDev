/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
export default class MenuManagement {
  constructor() {
    this.addIngredientBtn = document.querySelector('.add-ingredient-btn');
    this.ingredientsList = document.querySelector('.dish-ingredients-list');
    this.textareas = Array.from(document.querySelectorAll('.base-textarea-wrapper'));
    this.wrapper = document.querySelector('.dish-card');

    this.search = document.querySelector('.search-field-icon');
  }

  activateDish() {
    if (this.wrapper) {
      const activateBtns = Array.from(this.wrapper.querySelectorAll('.activate-btn'));
      const deactivateBtns = Array.from(this.wrapper.querySelectorAll('.deactivate-btn'));

      activateBtns.forEach((activateBtn) => {
        activateBtn.addEventListener('click', (e) => {
          e.preventDefault();
          activateBtn.classList = 'active activate-btn';
          deactivateBtns.forEach((deactivateBtn) => {
            deactivateBtn.classList = 'deactivate-btn';
          });
        });
      });


      deactivateBtns.forEach((deactivateBtn) => {
        deactivateBtn.addEventListener('click', (e) => {
          e.preventDefault();
          deactivateBtn.classList = 'active deactivate-btn';
          activateBtns.forEach((activateBtn) => {
            activateBtn.classList = 'activate-btn';
          });
        });
      });
    }
  }

  addIngredient() {
    if (this.addIngredientBtn) {
      this.addIngredientBtn.addEventListener('click', () => {
        const ingredient = document.createElement('li');
        const value = document.querySelector('input[name="ingredient"]:checked').value;
        ingredient.classList = 'dish-ingredients-item';
        ingredient.innerHTML = `<span>${value}</span>
        <button type="button" class="delete-icon">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L9 9M9 1L1 9" stroke="#7C7E92"/>
              </svg>                              
        </button>`;
        this.ingredientsList.appendChild(ingredient);

        const delIngredientBtn = ingredient.querySelector('.delete-icon');

        delIngredientBtn.addEventListener('click', () => {
          ingredient.remove();
        });
      });
    }
  }

  countTextareaSymbols() {
    if (this.textareas) {
      this.textareas.forEach((textareaWrapper) => {
        const textarea = textareaWrapper.querySelector('textarea');
        const maxlength = textarea.maxLength;
        let lengthNow = textarea.value.length;
        const symbolsNow = textareaWrapper.querySelector('.symbols-now');
        const symbolsGeneral = textareaWrapper.querySelector('.symbols-max');
        symbolsGeneral.innerHTML = ` ${maxlength}`;
        symbolsNow.innerHTML = `${lengthNow} /`;

        textarea.addEventListener('input', () => {
          lengthNow = textarea.value.length;
          symbolsNow.innerHTML = `${lengthNow} /`;
        });
      });
    }
  }

  openSearch(){
    if (this.search) {
      this.search.addEventListener('click', () => {
        if (document.getElementsByClassName('search-field-input')[0].classList.contains('open')) {
          document.getElementsByClassName('search-field-input')[0].classList.remove('open');
        } else {
          document.getElementsByClassName('search-field-input')[0].classList.add('open');
        }

      });
    }

  }

  init() {
    this.addIngredient();
    this.countTextareaSymbols();
    this.activateDish();
    this.openSearch();
  }
}
