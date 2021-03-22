// Импорт модулей:
import {setDefault, activateSite} from './activation.js';
import {renderCard} from './card.js';
import {filterStays, setFiltersChange} from './filter.js';

// Переменные:
const MAIN_MARKER_SIZE = 52;
const MARKER_SIZE = 46;
// Координаты взяла с сайта: https://dateandtime.info/ru/citycoordinates.php?id=1850147
const CENTER_LATITUDE = 35.68950;
const CENTER_LONGITUDE = 139.69171;

const SIMILAR_STAYS_COUNT = 10;

// Функция установления изначальных настроек сайта (поля заблокированы, адрес = readonly)
setDefault();

// Настройка карты:
/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    activateSite();
  })
  .setView({
    lat: CENTER_LATITUDE,
    lng: CENTER_LONGITUDE,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Маркеры:
const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_MARKER_SIZE, MAIN_MARKER_SIZE],
  iconAnchor: [MAIN_MARKER_SIZE / 2, MAIN_MARKER_SIZE],
});

const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
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

// Создать маркеры
const createMarkers = (stays) => {
  const markers = [];
  for (let i = 0; i < stays.length;i++) {
    const marker = L.marker(
      {
        lat: stays[i].location.lat,
        lng: stays[i].location.lng,
      },
      {
        icon: markerIcon,
      },
    );
    markers.push(marker);
  }
  return(markers);
}

// Удалить маркеры
const deleteMarkers = (markers) => {
  for (let i = 0; i < markers.length;i++) {
    markers[i]
      .remove();
  }
}

const pasteCards = (similarStays) => {
  const finalSimilarStays = filterStays(similarStays).slice(0, SIMILAR_STAYS_COUNT);
  const markers = createMarkers(finalSimilarStays);
  for (let i = 0; i < markers.length;i++) {
    markers[i]
      .addTo(map)
      .bindPopup(renderCard(finalSimilarStays[i]));
  }
  setFiltersChange(() => deleteMarkers(markers));
}

// Установка основного маркера по умолчанию после отправки/сброса формы
const setDefaultMainMarker = () => {
  mainMarker.setLatLng([CENTER_LATITUDE, CENTER_LONGITUDE]);
}

export {mainMarker, pasteCards, setDefaultMainMarker};
