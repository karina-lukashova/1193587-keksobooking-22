// Импорт модулей:
import {deactivateSite, activateSite} from './activation.js';
import {getSimilarStays} from './data.js';
import {renderCard} from './card.js';

// Переменные:
const SIMILAR_STAYS_COUNT = 10;
const MAIN_MARKER_SIZE = 52;
const MARKER_SIZE = 46;
const CENTER_LATITUDE = 35.67919;
const CENTER_LONGITUDE = 139.76881;
const DIGITS_NUMBER = 5;
const similarStays = getSimilarStays(SIMILAR_STAYS_COUNT);

// Настройка карты:
/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    activateSite();
  })
  .setView({
    lat: 35.679189,
    lng: 139.768807,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Маркеры:
const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_MARKER_SIZE, MAIN_MARKER_SIZE],
  iconAnchor: [MAIN_MARKER_SIZE / 2, MAIN_MARKER_SIZE],
});

const markerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [MARKER_SIZE, MARKER_SIZE],
  iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE],
});

const mainMarker = L.marker(
  {
    lat: CENTER_LATITUDE,
    lng: CENTER_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

const createMarker = (lat, lng, stay) => {
  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: markerIcon,
    },
  )
  marker
    .addTo(map)
    .bindPopup(stay);
}

// Поле адреса в зависимости от положения основной метки:
const adressElement = document.querySelector('#address');

const getAdressValue = (marker) => `${marker._latlng.lat.toFixed(DIGITS_NUMBER)}, ${marker._latlng.lng.toFixed(DIGITS_NUMBER)}`;

adressElement.readOnly = true;
adressElement.value = getAdressValue(mainMarker);

mainMarker.on('moveend', () => {
  adressElement.value = getAdressValue(mainMarker);
});

// Генерация меток объявлений и самих объявлений:
similarStays.forEach(stay => {
  createMarker(stay.location.x, stay.location.y, renderCard(stay));
})
// Единственное: большинство меток находятся в одной точке из-за несовершенства рандомайзера. Т.к. в функции getRandomNumber мы добавляем +1 для включения верхней границы числа, то чаще всего координаты находятся как раз в этих максимальных точках. Как я поняла, рандом нам нужен для тестирования, а в итоге будем получать данные с сервера - поэтому не меняла рандомайзер.

// Функция деактивации: если карта не загрузится, то все нужные поля заблокируются. Иначе - разблокируются.
deactivateSite();
