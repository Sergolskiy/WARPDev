/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable func-names */
import IMask from 'imask';

const formValidation = () => {
  const HAS_ERROR = 'error';
  const formsArr = Array.from(document.forms);

  formsArr.forEach((form) => {
    const inputs = [...form.querySelectorAll('input'), ...form.querySelectorAll('textarea')];
    const submitBtn = form.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        let isValid = true;


        for (const input of inputs) {
          if (!input.checkValidity()) {
            isValid = false;
          }
        }

        if (isValid) {
          submitBtn.classList.add('success');
          return;
        }

        submitBtn.classList.add('error');
      });
    }

    inputs.forEach((input) => {
      input.addEventListener('invalid', function (event) {
        event.preventDefault();
        this.parentNode.classList.add(HAS_ERROR);
      });
      input.addEventListener('focus', function () {
        this.parentNode.classList.remove(HAS_ERROR);
      });

      input.addEventListener('click', function () {
        this.parentNode.classList.remove(HAS_ERROR);
      });

      input.addEventListener('touch', function () {
        this.parentNode.classList.remove(HAS_ERROR);
      }, false);
    });
  });

  const maskInput = () => {
    const maskedInputs = Array.from(document.querySelectorAll('.time-masked-input'));
    maskedInputs.forEach((input) => {
      const maskOptions = {
        mask: '00.00',
      };
      const mask = IMask(input, maskOptions);
    });
  };

  const textareaExpanding = () => {
    const textareas = Array.from(document.querySelectorAll('textarea'));
    textareas.forEach((textarea) => {
      autosize(textarea);
    });
  };

  const materialDatapicker = () => {
    const options = {};
    const elems = document.querySelectorAll('.datepicker');
    const instances = M.Datepicker.init(elems, options);
  };

  const materialTimepicker = () => {
    const options = {};
    const elems = document.querySelectorAll('.timepicker');
    const instances = M.Timepicker.init(elems, options);
  };

  const selectbox = () => {
    const selectboxes = Array.from(document.querySelectorAll('.select-box'));
    if (selectboxes.length > 0) {
      selectboxes.forEach((box) => {
        const input = box.querySelector('.select-box__current');
        const list = box.querySelector('.select-box__list');
        input.addEventListener('click', () => {
          box.classList.toggle('active');
        });
      });
    }
  };

  const inputAnimation = () => {
    const wrappers = Array.from(document.querySelectorAll('.input-animation'));
    if (wrappers.length > 0) {
      wrappers.forEach((wrapper) => {
        const input = wrapper.querySelector('input');
        const label = wrapper.querySelector('label');
        input.addEventListener('blur', () => {
          if (input.value.length > 0) {
            label.classList.add('input-activated');
            return;
          }
          label.classList.remove('input-activated');
        });
      });
    }
  };

  const init = () => {
    formValidation();
    maskInput();
    textareaExpanding();
    materialDatapicker();
    materialTimepicker();
    selectbox();
    inputAnimation();
  };

  return {
    init,
  };
};

export default formValidation();
