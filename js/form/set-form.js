import { initSlider, updateSliderByPriceInput } from './slider-control.js';
import { adFormChange, checkErrors } from './validate-form.js';
import { sendForm } from './form-handler.js';

// Поиск подходящей разметки
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormElements = adForm.childNodes;
const mapFiltersElements = mapFilters.childNodes;

// Функция установки элементу состояния disabled
const setElementsState = (elements, state) => {
  elements.forEach((element) => {
    element.disabled = state;
  });
};

// Функция, активирующая форму
const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  setElementsState(adFormElements, false);
  initSlider();
  updateSliderByPriceInput();
  adFormChange();
  checkErrors();
  sendForm();
};

// Функция, активирующая фильтры
const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  setElementsState(mapFiltersElements, false);
};

// Функция, делающая форму неактивной
const inactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  setElementsState(adFormElements, true);
};

// Функция, делающая фильтры неактивными
const inactivateFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  setElementsState(mapFiltersElements, true);
};

export { activateForm, activateFilters, inactivateForm, inactivateFilters };
