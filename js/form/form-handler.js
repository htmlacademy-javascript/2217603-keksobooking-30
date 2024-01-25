import { validateForm, resetPristine, adFormChange, checkErrors, validatePhoto } from './validate-form.js';
import { resetSlider } from './slider-control.js';
import { renderMainPinMarkerCoordinates, resetMap } from '../map/render-map.js';
import { sendData } from '../data/server-data.js';
import { resetImages } from './image-upload.js';

// Находим нужную разметку
const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const description = adForm.querySelector('#description');
const price = adForm.querySelector('#price');
const features = adForm.querySelectorAll('.features__checkbox');
const address = adForm.querySelector('#address');
const title = adForm.querySelector('#title');

// Устанавливаем начальные значения
const defaultType = type.value;
const defaultRoomNumber = roomNumber.value;
const defaultCapacity = capacity.value;
const defaultTimein = timein.value;
const defaultTimeout = timeout.value;
const defaultPricePlaceholder = price.placeholder;
const defaultPrice = price.value;
const defaultPriceMin = price.min;

// Обнуляет удобства
const resetFeatures = () => features.forEach(
  (feature) => {
    feature.checked = false;
  }
);

// Что происходит при обновлении формы
const resetAdForm = () => {
  adForm.reset();
  resetPristine();
  resetMap(address);
  resetImages();
  price.min = defaultPriceMin;
  price.placeholder = defaultPricePlaceholder;
  price.value = defaultPrice;
  resetSlider();
  title.value = '';
  type.value = defaultType;
  roomNumber.value = defaultRoomNumber;
  capacity.value = defaultCapacity;
  timein.value = defaultTimein;
  timeout.value = defaultTimeout;
  description.value = '';
  resetFeatures();
};

// Функция запуска валидатора при отправке формы
const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (validateForm() && validatePhoto()) {
    sendData(evt.target);
  }
};

// Обновление формы
const onFormReset = (evt) => {
  evt.preventDefault();
  resetAdForm();
};

// Инициирует форму
const initForm = () => {
  adFormChange();
  checkErrors();
  adForm.reset();
  resetPristine();
  renderMainPinMarkerCoordinates(address);
  adForm.addEventListener('reset', onFormReset);
  adForm.addEventListener('submit', onFormSubmit);
};

export { initForm, resetAdForm };
