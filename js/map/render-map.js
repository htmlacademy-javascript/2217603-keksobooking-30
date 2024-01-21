import { activateForm } from '../form/set-form.js';
import { renderAdvert } from '../get-adverts/render-adverts.js';

// Изначальные данные
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const DECIMAL_PLACES_COUNT = 5;
const ZOOM = 13;
const mainIconConfig = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};
const iconConfig = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40,
};
const CITY_CENTER = {
  lat: 35.67640,
  lng: 139.76134,
};

// Нужная разметка
const mapContainer = document.querySelector('.map__canvas');

// Создаем карту
const map = L.map(mapContainer);

// Создаем иконку для главного маркера
const mainPinIcon = L.icon({
  iconUrl: mainIconConfig.url,
  iconSize: [mainIconConfig.width, mainIconConfig.height],
  iconAnchor: [mainIconConfig.anchorX, mainIconConfig.anchorY],
});

// Создаем иконку для обычного маркера
const pinIcon = L.icon({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
});

// Создаем главный маркер, который можно перетаскивать и добавляем его на карту
const mainPinMarker = L.marker(CITY_CENTER, {
  draggable: true,
  icon: mainPinIcon,
}).addTo(map);

// Берет новые координаты из маркера и ставит их в нужное поле
const onMoveendMainPinMarker = (evt, address) => {
  const newPosition = evt.target.getLatLng();
  address.value = `${newPosition.lat.toFixed(DECIMAL_PLACES_COUNT)}, ${newPosition.lng.toFixed(DECIMAL_PLACES_COUNT)}`;
};

// Обнуляет маркер и позволяет реагировать на перенос маркера
const renderMainPinMarkerCoordinates = (address) => {
  address.value = `${CITY_CENTER.lat.toFixed(DECIMAL_PLACES_COUNT)}, ${CITY_CENTER.lng.toFixed(DECIMAL_PLACES_COUNT)}`;
  mainPinMarker.on('moveend', (evt) => onMoveendMainPinMarker(evt, address));
};

// Создает группу маркеров
const markersGroup = L.layerGroup().addTo(map);

// Создаем маркер
const createMarker = (advert) => L.marker(advert.location, {
  icon: pinIcon,
}).addTo(markersGroup)
  .bindPopup(renderAdvert(advert));

// Отрисовываем маркеры по массиву
const renderMarkers = (adverts) => {
  adverts.forEach((advert) => createMarker(advert));
};

const setAdverts = async (data) => {
  markersGroup.clearLayers();
  const adverts = await structuredClone(data);
  renderMarkers(adverts);
};

// Отрисовываем карту и активируем форму при загрузке карты
const renderMap = () => {
  map.on('load', () => {
    activateForm();
  })
    .setView(CITY_CENTER, ZOOM);

  // Добавляем слой непосредственно с картой
  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
};

const resetMap = (address) => {
  map.closePopup();
  mainPinMarker.setLatLng(CITY_CENTER);
  map.setView(CITY_CENTER, ZOOM);
  address.value = `${CITY_CENTER.lat.toFixed(DECIMAL_PLACES_COUNT)}, ${CITY_CENTER.lng.toFixed(DECIMAL_PLACES_COUNT)}`;
};

export { renderMap, renderMainPinMarkerCoordinates, resetMap, setAdverts };
