//Изначальные данные
const ADVERT_OBJECT_COUNT = 10;
const DECIMAL_PLACES_COUNT = 5;

const LAT = {
  min: 35.65000,
  max: 35.70000,
};

const LNG = {
  min: 139.70000,
  max: 139.80000,
};

const TITLES = [
  'Уютная двушка на окраине',
  'Выгодная студия недалеко от метро',
  'Минималистичная студия в центре',
  'Отличный вариант для студента',
  'Прекрасный вид из окна',
  'Выбор семьи с детьми',
  'Специальное предложение для вечеринок',
  'Только семейным, никаких котов',
  'Можно с котом, остальное по договоренности',
  'Самый лучший вариант',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTO_URL = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// Функция получения случайного целого числа из переданного диапазона
const getRandomInteger = (a = 0, b = 50) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Получение случайного дробного числа
const getRandomFloat = (object) =>
  (Math.random() * (object.max - object.min) + object.min).toFixed(DECIMAL_PLACES_COUNT);

// Получение случайного элемента массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// Создание массива с уникальными элементами
const createArrayWithRandomUniqElements = (array) => {
  const objects = new Set(Array.from({ length: getRandomInteger(0, array.length) }, () => getRandomArrayElement(array)));
  return Array.from(objects);
};

// Начало отсчета id и локаций
let userId = 1;
let latitude = 0;
let longitude = 0;

// Создает уникальный адрес с id из нужного количества цифр
const createUser = () => {
  const userIdLength = 2;
  const userSrc = `img/avatars/user${`${userId++}`.padStart(userIdLength, '0')}.png`;
  return userSrc;
};

// Создает локацию
const createLocation = (lat, lng) => ({
  lat: lat,
  lng: lng,
});

// Создает информацию об объявлении
const createOffer = (lat, lng) => ({
  title: getRandomArrayElement(TITLES),
  address: `${lat}, ${lng}`,
  price: `${getRandomInteger()} т.р.`,
  type: getRandomArrayElement(TYPES),
  rooms: getRandomInteger(),
  guests: getRandomInteger(),
  checkin: getRandomArrayElement(TIMES),
  checkout: getRandomArrayElement(TIMES),
  features: createArrayWithRandomUniqElements(FEATURES),
  description: getRandomArrayElement(TITLES),
  photos: createArrayWithRandomUniqElements(PHOTO_URL),
});

// Функция, создающая нужный объект объявления
const createAdvert = () => {
  latitude = getRandomFloat(LAT);
  longitude = getRandomFloat(LNG);
  return ({
    author: { avatar: createUser() },
    offer: createOffer(latitude, longitude),
    location: createLocation(latitude, longitude),
  });
};

//Функция, создающая массив из нужного количества объявлений.
const getAdverts = () => Array.from(
  { length: ADVERT_OBJECT_COUNT }, createAdvert
);

getAdverts();
