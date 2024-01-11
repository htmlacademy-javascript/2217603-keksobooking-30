import { validatePrice } from './validate-form.js';

// Исходные данные
const PRICE = {
  MAX: 100000,
  MIN: 0,
};
const STEP = 1;

// Находим нужную разметку
const slider = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price');

// Создает слайдер
const initSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: PRICE.MIN,
      max: PRICE.MAX
    },
    start: PRICE.MIN,
    step: STEP,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  slider.noUiSlider.off('slide');
  slider.noUiSlider.on('slide', () => {
    price.value = slider.noUiSlider.get();
    validatePrice();
  });
};

// Устанавливает значение цены слайдера
const onPriceInputChange = () => {
  slider.noUiSlider.set(price.value);
};

// Обновляет слайдер при изменении цены
const updateSliderByPriceInput = () => price.addEventListener('input', onPriceInputChange);

// Обнуляет слайдер
const resetSlider = () => slider.noUiSlider.reset();

export {initSlider, updateSliderByPriceInput, resetSlider};
