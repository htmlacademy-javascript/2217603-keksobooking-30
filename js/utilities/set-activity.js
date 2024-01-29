import { initSlider, updateSliderByPriceInput } from '../form/slider-control.js';

// Поиск подходящей разметки
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormElements = adForm.childNodes;
const mapFiltersElements = mapFilters.childNodes;

// Функция установки элементам состояния disabled
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
};

// Функция, активирующая фильтры
const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  setElementsState(mapFiltersElements, false);
};

// Функция, делающая фильтры неактивными
const inactivateFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  setElementsState(mapFiltersElements, true);
};

export { activateForm, activateFilters, inactivateFilters };
