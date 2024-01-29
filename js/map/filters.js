// Изначальные данные: количество отрисованных объявлений
const ADVERT_OBJECT_MIN = 0;
const ADVERT_OBJECT_MAX = 10;

const DEFAULT_VALUE = 'any';

const FILTER_PRICE_OPTIONS = {
  'any': {
    min: 0,
    max: 100000
  },
  'middle': {
    min: 10000,
    max: 50000
  },
  'low': {
    min: 0,
    max: 10000
  },
  'high': {
    min: 50000,
    max: 100000
  }
};

// Ищем нужную разметку
const filtersContainer = document.querySelector('.map__filters-container');
const filtersForm = filtersContainer.querySelector('.map__filters');
const filterType = filtersForm.querySelector('#housing-type');
const filterPrice = filtersForm.querySelector('#housing-price');
const filterRooms = filtersForm.querySelector('#housing-rooms');
const filterGuests = filtersForm.querySelector('#housing-guests');

const setCondition = (element, select) => {
  if (select.value !== DEFAULT_VALUE) {
    return String(element) === select.value;
  }
  return true;
};

const setConditionPrice = (element, select) => {
  if (element >= FILTER_PRICE_OPTIONS[select.value].min && element <= FILTER_PRICE_OPTIONS[select.value].max
  ) {
    return true;
  }
};

const setConditionFeatures = (array) => {
  const inputFeatureChecked = document.querySelectorAll('input[name="features"]:checked');
  if (!array || array.length === 0) {
    return false;
  }
  return Array.from(inputFeatureChecked).every((feature) => array.includes(feature.value));
};

const filtrateAdverts = (adverts) => adverts.filter(({ offer }) =>
  setCondition(offer.type, filterType)
  && setCondition(offer.rooms, filterRooms)
  && setCondition(offer.guests, filterGuests)
  && setConditionPrice(offer.price, filterPrice)
  && setConditionFeatures(offer.features)
).slice(ADVERT_OBJECT_MIN, ADVERT_OBJECT_MAX);

export { filtrateAdverts };
