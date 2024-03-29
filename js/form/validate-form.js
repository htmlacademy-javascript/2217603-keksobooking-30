import { createThumbnailPhoto, renderThumbnail } from './image-upload';

// Исходные данные
const TITLE_LENGTH = {
  MIN: 30,
  MAX: 100,
};
const PRICE = {
  MAX: 100000,
  MIN: {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
  },
};
const ROOMS_AND_PLACES_MATCHING = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const ERROR_MESSAGES = {
  required: 'Поле обязательно для заполнения',
  title: `В заголовке должно быть от ${TITLE_LENGTH.MIN} до ${TITLE_LENGTH.MAX} символов.`,
  capacity: 'Количество комнат не соответствует количеству гостей',
  priceMax: `Цена должна быть меньше ${PRICE.MAX}.`,
  priceMin: 'Цена должна быть больше минимальной для данного типа жилья.',
  picture: 'Некорректный формат изображения',
};

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'svg'];

// Ищем нужную разметку
const adForm = document.querySelector('.ad-form');
const inputs = adForm.querySelectorAll('input');
const title = adForm.querySelector('#title');
const typeSelect = adForm.querySelector('#type');
const priceSelect = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const roomSelect = adForm.querySelector('#room_number');
const guestSelect = adForm.querySelector('#capacity');
const avatarField = adForm.querySelector('#avatar');
const photoField = adForm.querySelector('#images');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');

// Создание у обязательных полей атрибута для валидации
inputs.forEach((input) => {
  if (input.hasAttribute('required')) {
    input.setAttribute('data-pristine-required-message', ERROR_MESSAGES.required);
  }
});

// Создаем начальные настройки классов для пристин
const pristine = new Pristine(adForm, {
  classTo: 'ad-form-validation',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form-validation',
  errorTextClass: 'text-help',
});

// Проверка длины заголовка
const checkTitleLength = (value) => value.length >= TITLE_LENGTH.MIN && value.length <= TITLE_LENGTH.MAX;

// Проверка значения максимальной цены
const checkPriceMax = (value) => Number(value) <= PRICE.MAX;

// Проверка значения минимальной цены
const checkPriceMin = (value) => Number(value) >= PRICE.MIN[typeSelect.value];

// Проверка соответствия комнат числу гостей
const checkRoomsAndPlaces = (value) => ROOMS_AND_PLACES_MATCHING[roomSelect.value].includes(value);

// Проверка соответствующего типа загруженного фото
const validatePhoto = (file) => {
  if (!file) {
    return true;
  }
  file = file.toLowerCase();
  return FILE_TYPES.some((type) => file.endsWith(type));
};

// Функция создания валидаторов для проверки ошибок
const checkErrors = () => {
  // Валидация длины заголовка
  pristine.addValidator(
    title,
    checkTitleLength,
    ERROR_MESSAGES.title,
    1,
    true
  );
  // Валидация максимальной цены
  pristine.addValidator(
    priceSelect,
    checkPriceMax,
    ERROR_MESSAGES.priceMax,
    1,
    true
  );
  // Валидация минимальной цены
  pristine.addValidator(
    priceSelect,
    checkPriceMin,
    ERROR_MESSAGES.priceMin,
    1,
    true
  );
  // Валидация комнат и гостей
  pristine.addValidator(
    guestSelect,
    checkRoomsAndPlaces,
    ERROR_MESSAGES.capacity,
    1,
    true
  );
  // Валидация загруженных фото
  pristine.addValidator(
    avatarField,
    validatePhoto,
    ERROR_MESSAGES.picture,
    1,
    true
  );
  pristine.addValidator(
    photoField,
    validatePhoto,
    ERROR_MESSAGES.picture,
    1,
    true
  );
};

// Создает функцию вызова валидации и перезагрузки
const validateForm = () => pristine.validate();
const resetPristine = () => pristine.reset();

// Проверяет цену на соответствие
const validatePrice = () => pristine.validate(priceSelect);

// Функция реакции на изменение типа жилья
const onTypeSelectChange = () => {
  priceSelect.placeholder = `Минимум ${PRICE.MIN[typeSelect.value]}`;
  priceSelect.min = PRICE.MIN[typeSelect.value];
  validatePrice();
};

// Функция реакции на изменение гостей/комнат
const onRoomsAndGuestsSelectChange = () => {
  pristine.validate(guestSelect);
};

// Функция синхронизации времени
const onTimeSelectChange = (firstTime, secondTime) => {
  firstTime.value = secondTime.value;
};

// Запускает нужные функции по изменению селектов
const adFormChange = () => adForm.addEventListener('change', (event) => {
  switch (event.target.name) {
    case 'avatar':
      pristine.validate(avatarField);
      renderThumbnail(event.target.files[0], avatarPreview);
      break;
    case 'type':
      onTypeSelectChange();
      break;
    case 'rooms':
      onRoomsAndGuestsSelectChange();
      break;
    case 'capacity':
      onRoomsAndGuestsSelectChange();
      break;
    case 'timein':
      onTimeSelectChange(timeOutSelect, timeInSelect);
      break;
    case 'timeout':
      onTimeSelectChange(timeInSelect, timeOutSelect);
      break;
    case 'images':
      renderThumbnail(event.target.files[0], createThumbnailPhoto());
      pristine.validate(photoField);
      break;
  }
});

export { validateForm, resetPristine, adFormChange, checkErrors, validatePrice, validatePhoto };
