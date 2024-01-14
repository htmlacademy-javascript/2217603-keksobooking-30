import { validatePristine, resetPristine } from './validate-form.js';
import { resetSlider } from './slider-control.js';
import { renderMainPinMarkerCoordinates, resetMap } from '../map/render-map.js';
import { showMessageError, showMessageSuccess } from './form-message.js';
import { sendData } from '../api.js';

// Текст кнопки отправки формы, для предотвращения многократных отправок
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

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
const submitButton = adForm.querySelector('.ad-form__submit');

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

// Блокировка и разблокировка кнопки отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Что происходит при обновлении формы
const resetAdForm = () => {
  adForm.reset();
  resetPristine();
  resetMap(address);
  resetSlider();
  price.min = defaultPriceMin;
  price.placeholder = defaultPricePlaceholder;
  price.value = defaultPrice;
  title.value = '';
  type.value = defaultType;
  roomNumber.value = defaultRoomNumber;
  capacity.value = defaultCapacity;
  timein.value = defaultTimein;
  timeout.value = defaultTimeout;
  description.value = '';
  resetFeatures();
};

// Функция запуска валидатора
const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (validatePristine()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(showMessageSuccess)
      .catch(
        (err) => {
          showMessageError(err.message);
        }
      )
      .finally(unblockSubmitButton);
  }
};

// Обновление формы
const onFormReset = (evt) => {
  evt.preventDefault();
  resetAdForm();
};

// Что происходит при отправке формы
const sendForm = () => {
  renderMainPinMarkerCoordinates(address);
  adForm.addEventListener('submit', onFormSubmit);
  adForm.addEventListener('reset', onFormReset);
};

export { sendForm };
