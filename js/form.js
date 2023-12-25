// Поиск подходящей разметки
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('.ad-form fieldset');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const mapFilterContainer = document.querySelector('.map__filters');
const mapFilters = mapFilterContainer.querySelectorAll('.map__filter');
const mapFeatures = mapFilterContainer.querySelectorAll('.map__features');

// Функция, делающая форму неактивной
const inactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  adFormSlider.disabled = true;
};

// Функция, делающая фильтры неактивными
const inactivateFilters = () => {
  mapFilterContainer.classList.add('map__filters--disabled');
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = true;
  });
  mapFeatures.forEach((mapFeature) => {
    mapFeature.disabled = true;
  });
};

// Функция, делающая форму активной
const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  adFormSlider.disabled = false;
};

// Функция, делающая фильтры активными
const activateFilters = () => {
  mapFilterContainer.classList.remove('map__filters--disabled');
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = false;
  });
  mapFeatures.forEach((mapFeature) => {
    mapFeature.disabled = false;
  });
};

export { inactivateForm, inactivateFilters, activateForm, activateFilters };
