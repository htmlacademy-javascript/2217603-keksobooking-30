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

const filterAdverts = (adverts, featuresList) => adverts
  .filter(({ offer }) => (filterType.value === DEFAULT_VALUE || offer.type === filterType.value))
  .filter(({ offer }) => (offer.price >= FILTER_PRICE_OPTIONS[filterPrice.value].min && offer.price <= FILTER_PRICE_OPTIONS[filterPrice.value].max))
  .filter(({ offer }) => (filterRooms.value === DEFAULT_VALUE || offer.rooms === Number(filterRooms.value)))
  .filter(({ offer }) => (filterGuests.value === DEFAULT_VALUE || offer.guests === Number(filterGuests.value)))
  .filter(({ offer }) => (
    featuresList.length === 0 || (offer.features && featuresList.every(
      (feature) => offer.features.includes(feature))
    ))
  )
  .slice(ADVERT_OBJECT_MIN, ADVERT_OBJECT_MAX);


export { filterAdverts };
