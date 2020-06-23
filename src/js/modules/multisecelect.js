/* eslint-disable no-param-reassign */
export default class Multiselect {
  constructor() {
    this.multiselectTable = Array.from(document.querySelectorAll('.multiselect-table'));
  }

  multiselect() {
    if (this.multiselectTable.length > 0) {
      this.multiselectTable.forEach((multiselectTable) => {
        const multiselectCheckbox = multiselectTable.querySelector('.multiselect-checkbox');
        const checkboxes = Array.from(multiselectTable.querySelectorAll('.selected-by-multiselect'));
        multiselectCheckbox.addEventListener('click', () => {
          if (multiselectCheckbox.checked) {
            checkboxes.forEach((checkbox) => {
              checkbox.checked = true;
            });
          } else {
            checkboxes.forEach((checkbox) => {
              checkbox.checked = false;
            });
          }
        });
      });
    }
  }

  init() {
    this.multiselect();
  }
}
