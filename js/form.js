import {mainMarker} from './map.js';

const DIGITS_NUMBER = 5;

const stayTypeElement = document.querySelector('#type');
const stayPriceElement = document.querySelector('#price');
const stayTimeInElement = document.querySelector('#timein');
const stayTimeOutElement = document.querySelector('#timeout');

const minPriceForTypeMap = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const setMinPrice = () => {
  stayPriceElement.min = minPriceForTypeMap[stayTypeElement.value];
  stayPriceElement.placeholder = minPriceForTypeMap[stayTypeElement.value];
}

const synchronizeTime = (firstTime, secondTime) => {
  firstTime.addEventListener('input', () => secondTime.value = firstTime.value);
}

stayTypeElement.addEventListener('input', () => {
  setMinPrice()
})

// Синхронизация времени:
synchronizeTime(stayTimeInElement, stayTimeOutElement);
synchronizeTime(stayTimeOutElement, stayTimeInElement);

// Поле адреса в зависимости от положения основной метки:
const adressElement = document.querySelector('#address');

const getAdressValue = (marker) => `${marker._latlng.lat.toFixed(DIGITS_NUMBER)}, ${marker._latlng.lng.toFixed(DIGITS_NUMBER)}`;

adressElement.value = getAdressValue(mainMarker);
mainMarker.on('moveend', () => {
  adressElement.value = getAdressValue(mainMarker);
});

export {adressElement};
