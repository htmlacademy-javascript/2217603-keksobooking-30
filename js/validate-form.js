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
  2: ['2, 1'],
  3: ['3, 2, 1'],
  100: ['0'],
};

const ERROR_MESSAGES = {
  required: 'Поле обязательно для заполнения',
  title: `В заголовке должно быть от ${TITLE_LENGTH.MIN} до ${TITLE_LENGTH.MAX} символов.`,
  capacity: 'Количество комнат не соответствует количеству гостей',
};

// Ищем нужную разметку
const adForm = document.querySelector('.ad-form');
const inputs = adForm.querySelectorAll('input');
const title = adForm.querySelector('#title');
const typeSelect = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const roomSelect = adForm.querySelector('#room_number');
const guestSelect = adForm.querySelector('#capacity');

// Создание у обязательных полей атрибута для валидации
inputs.forEach((input) => {
  if (input.hasAttribute('required')) {
    input.setAttribute('data-pristine-required-message', ERROR_MESSAGES.required);
  }
});

// Создаем начальные настройки классов для пристин
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

// Проверка длины заголовка
const checkTitleLength = (value) => value.length >= TITLE_LENGTH.MIN && value.length <= TITLE_LENGTH.MAX;

// Проверка значения максимальной цены
const checkPriceMax = (value) => Number(value) <= PRICE.MAX;

// Проверка значения минимальной цены
const checkPriceMin = (value) => {
  const currentType = typeSelect.value;
  return Number(value) >= PRICE.MIN[currentType];
};

// Проверка соответствия комнат числу гостей
const checkRoomsAndPlaces = (value) => ROOMS_AND_PLACES_MATCHING[roomSelect.value].includes(value);

// Создает сообщения об ошибках при валидации
const createErrorMassages = () => {
  // Валидация длины заголовка
  pristine.addValidator(
    title,
    checkTitleLength,
    ERROR_MESSAGES.title
  );
  // Валидация максимальной цены
  pristine.addValidator(
    price,
    checkPriceMax,
    `Цена должна быть меньше ${PRICE.MAX}.`
  );
  // Валидация минимальной цены
  pristine.addValidator(
    price,
    checkPriceMin,
    'Цена должна быть больше минимальной для данного типа жилья.'
  );
  // Валидация комнат и гостей
  pristine.addValidator(
    guestSelect,
    checkRoomsAndPlaces,
    ERROR_MESSAGES.capacity
  );
};

// Создает реакцию на изменение селектов
const createSelectsChange = () => {
  typeSelect.addEventListener('change', onTypeSelectChange);
  roomSelect.addEventListener('change', onRoomsAndGuestsSelectChange);
  guestSelect.addEventListener('change', onRoomsAndGuestsSelectChange);
  timeInSelect.addEventListener('change', () => onTimeSelectChange(timeOutSelect, timeInSelect));
  timeOutSelect.addEventListener('change', () => onTimeSelectChange(timeInSelect, timeOutSelect));
};

// Создает реакцию на выход из фокуса полей для валидации пустых
const resetValidationForRequiredInput = () => {
  title.addEventListener(('blur'), () => onRequiredInputBlur(title));
  price.addEventListener(('blur'), () => onRequiredInputBlur(price));
};

const validatePristine = () => pristine.validate();
const resetPristine = () => pristine.reset();

// Функция реакции на изменение типа жилья
function onTypeSelectChange() {
  price.placeholder = PRICE.MIN[typeSelect.value];
  price.min = PRICE.MIN[typeSelect.value];
}

// Функция реакции на изменение гостей/комнат
function onRoomsAndGuestsSelectChange() {
  pristine.validate(roomSelect);
  pristine.validate(guestSelect);
}

// Функция синхронизации времени
function onTimeSelectChange(firstTime, secondTime) {
  firstTime.value = secondTime.value;
}

// Функция удаления ошибок при пустом поле
function onRequiredInputBlur(input) {
  if (input.value.length === 0) {
    resetPristine();
  }
  createErrorMassages();
}

// Функция запуска валидатора
function onFormSubmit(evt) {
  evt.preventDefault();
  if (validatePristine()) {
    resetPristine();
    adForm.reset();
  }
}

// Отправка формы
const renderFormValidate = () => {
  createErrorMassages();
  resetValidationForRequiredInput();
  createSelectsChange();
  adForm.addEventListener(('submit'), onFormSubmit);
};

export { renderFormValidate };
