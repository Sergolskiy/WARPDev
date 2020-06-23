/* eslint-disable no-param-reassign */
/* eslint-disable prefer-arrow-callback */
export default class LoadImg {
  constructor() {
    this.imgLoaders = Array.from(document.querySelectorAll('.img-load'));
  }

  loadImg() {
    if (this.imgLoaders) {
      this.imgLoaders.forEach((imgLoader) => {
        // eslint-disable-next-line func-names
        const input = imgLoader.querySelector('input');
        input.addEventListener('change', () => {
          if (input.files[0]) {
            const fr = new FileReader();

            fr.addEventListener('load', () => {
              imgLoader.querySelector('label').style.backgroundImage = `url(${fr.result})`;
            }, false);

            fr.readAsDataURL(input.files[0]);

            const deleteBtn = imgLoader.querySelector('.img-delete-btn');
            const addBtn = imgLoader.querySelector('.add-btn');

            deleteBtn.classList.remove('d-none');
            addBtn.classList.add('d-none');

            deleteBtn.addEventListener('click', () => {
              delete input.files[0];
              imgLoader.querySelector('label').style.backgroundImage = '';
              deleteBtn.classList.add('d-none');
              addBtn.classList.remove('d-none');
            });
          }
        });
      });
    }
  }
}
