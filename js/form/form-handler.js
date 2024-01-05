import { validatePristine, resetPristine } from './validate-form.js';

// Находим нужную разметку
const adForm = document.querySelector('.ad-form');
const price = adForm.querySelector('#price');

// Устанавливаем начальные значения
const defaultPricePlaceholder = price.placeholder;
const defaultPrice = price.value;
const defaultPriceMin = price.min;

// Функция запуска валидатора
const onFormSubmit = (evt) => {
  if (!validatePristine()) {
    evt.preventDefault();
  }
};

// Что происходит при обновлении формы
const onFormReset = (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetPristine();
  price.min = defaultPriceMin;
  price.placeholder = defaultPricePlaceholder;
  price.value = defaultPrice;
};

// Обновляет форму при нажатии на reset
const resetForm = () => adForm.addEventListener('reset', onFormReset);

// Что происходит при отправке формы
const sendForm = () => {
  adForm.addEventListener('submit', onFormSubmit);
  resetForm();
};

export {sendForm};
