// Изначальные данные
const DECIMAL_PLACES_COUNT = 5;

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
const getArrayOfRandomUniqElements = (array) => {
  const objects = new Set(Array.from({ length: getRandomInteger(0, array.length) }, () => getRandomArrayElement(array)));
  return Array.from(objects);
};

export { getRandomInteger, getRandomFloat, getRandomArrayElement, getArrayOfRandomUniqElements };
