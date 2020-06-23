/* eslint-disable no-plusplus */
export default class Pagination {
  constructor(pagination, props) {
    this.activePage = props.activePage || 1;
    this.pagination = pagination;
    this.itemsOnPage = props.itemsOnPage || 5;
    this.items = pagination.querySelectorAll('.js-pagination-content-item');
    this.controls = pagination.querySelector('.js-pagination-controls');
    this.pagesQuantity = Math.ceil(this.items.length / this.itemsOnPage);
    this.endItemNumber = (this.activePage * this.itemsOnPage);
    this.startItemNumber = this.endItemNumber - this.itemsOnPage;
    this.controlsItems = [];
    this.range = [];
  }

  createControls() {
    for (let i = 1; i <= this.pagesQuantity; i++) {
      const controlItem = document.createElement('li');
      controlItem.classList = 'js-pagination-controls-item';
      controlItem.innerHTML = `<span>${i}</span>`;
      this.controlsItems.push(controlItem);
      this.controls.appendChild(controlItem);
    }
  }

  addActiveControlClass() {
    this.controlsItems.forEach((contrl, i) => {
      const index = i + 1;
      if (index !== this.activePage) {
        contrl.classList.remove('active');
      } else {
        contrl.classList.add('active');
      }
    });
  }

  startPagination() {
    this.controlsItems.forEach((control, i) => {
      const index = i + 1;

      control.addEventListener('click', () => {
        if (index === this.activePage) {
          return;
        }

        this.activePage = index;
        this.addActiveControlClass();
        this.endItemNumber = (this.activePage * this.itemsOnPage);
        this.startItemNumber = this.endItemNumber - this.itemsOnPage;

        this.createRange(this.startItemNumber, this.endItemNumber);

        this.hideItems(this.range);

        setTimeout(() => {
          this.showItems(this.range);
        }, 450);
      });
    });
  }


  hideItems() {
    this.items.forEach((item) => {
      item.classList.add('animated');
      item.classList.add('fadeOut');
      setTimeout(() => {
        item.classList.remove('animated');
        item.classList.remove('fadeOut');
      }, 400);
    });
  }

  showItems(range) {
    this.items.forEach((item, index) => {
      if (range.includes(index)) {
        item.classList.remove('d-none');
        item.classList.add('animated');
        item.classList.add('fadeIn');
      } else {
        item.classList.add('d-none');
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createRange(start, end) {
    this.range = [];
    for (let j = start; j < end; j++) {
      this.range.push(j);
    }
  }

  init() {
    this.createControls();
    this.createRange(this.startItemNumber, this.endItemNumber);
    this.addActiveControlClass();
    this.showItems(this.range);
    this.startPagination();
  }
}
