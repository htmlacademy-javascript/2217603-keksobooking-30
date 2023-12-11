import { getRandomInteger, getRandomFloat, getRandomArrayElement, createArrayWithRandomUniqElements } from './util.js';

// Изначальные данные
const ADVERT_OBJECT_COUNT = 10;

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
  price: getRandomInteger(),
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

export { getAdverts };
