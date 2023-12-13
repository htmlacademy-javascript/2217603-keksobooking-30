import { getRandomInteger, getRandomFloat, getRandomArrayElement, getArrayOfRandomUniqElements } from './util.js';
import { LAT, LNG, TITLES, TYPES, TIMES, FEATURES, DESCRIPTIONS, PHOTO_URL } from './data.js';

// Изначальные данные
const ADVERT_OBJECT_COUNT = 10;

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

// Создает автора
const createAuthor = () => ({
  avatar: createUser()
});

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
  features: getArrayOfRandomUniqElements(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getArrayOfRandomUniqElements(PHOTO_URL),
});

// Функция, создающая нужный объект объявления
const createAdvert = () => {
  latitude = getRandomFloat(LAT);
  longitude = getRandomFloat(LNG);
  return ({
    author: createAuthor(),
    offer: createOffer(latitude, longitude),
    location: createLocation(latitude, longitude),
  });
};

//Функция, создающая массив из нужного количества объявлений.
const getAdverts = () => Array.from(
  { length: ADVERT_OBJECT_COUNT }, createAdvert
);

export { getAdverts };
