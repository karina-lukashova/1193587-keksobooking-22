import {mainMarker} from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const DIGITS_NUMBER = 5;

const stayTypeElement = document.querySelector('#type');
const stayPriceElement = document.querySelector('#price');
const stayTimeInElement = document.querySelector('#timein');
const stayTimeOutElement = document.querySelector('#timeout');
const titleElement = document.querySelector('#title');
const priceElement = document.querySelector('#price');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');

const roomCapacityMap = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
}

const minPriceForTypeMap = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

// Функция проверки равенства элемента массива значению из capacityElement:
const hasCapacityValue = (element) => {
  return element === capacityElement.value;
}

// Функция валидации количества комнат и гостей:
const validateRoomCapacity = () => {
  if (!roomCapacityMap[roomNumberElement.value].some(hasCapacityValue)) {
    if (roomNumberElement.value === '100') {
      capacityElement.setCustomValidity('100 комнат может быть только "не для гостей"');
    } else {
      capacityElement.setCustomValidity(`Для выбранного количества комнат количество гостей должно быть: ${roomCapacityMap[roomNumberElement.value]}`);
    }
  } else {
    capacityElement.setCustomValidity('');
  }

  capacityElement.reportValidity();
}

// Функция установки минимальной цены:
const setMinPrice = () => {
  stayPriceElement.min = minPriceForTypeMap[stayTypeElement.value];
  stayPriceElement.placeholder = minPriceForTypeMap[stayTypeElement.value];
}

// Функция синхронизации времени:
const synchronizeTime = (firstTime, secondTime) => {
  firstTime.addEventListener('input', () => secondTime.value = firstTime.value);
}

// Валидация названия объявления:
titleElement.addEventListener('input', () => {
  const titleLength = titleElement.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    titleElement.setCustomValidity('Введите ещё ' + (MIN_TITLE_LENGTH - titleLength) +' симв.');
  } else if (titleLength > MAX_TITLE_LENGTH) {
    titleElement.setCustomValidity('Удалите лишние ' + (titleLength - MAX_TITLE_LENGTH) +' симв.');
  } else {
    titleElement.setCustomValidity('');
  }

  titleElement.reportValidity();
})

// Валидация цены:
priceElement.addEventListener('input', () => {
  const priceValue = priceElement.value;
  if (priceValue < MIN_PRICE) {
    priceElement.setCustomValidity('Цена должна быть минимум 0 рублей');
  } else if (priceValue > MAX_PRICE) {
    priceElement.setCustomValidity('Цена должна быть максимум 1 000 000 рублей');
  } else {
    priceElement.setCustomValidity('');
  }

  priceElement.reportValidity();
})

// Валидация соответствия количества гостей от количества комнат - при изменении количества комнат:
roomNumberElement.addEventListener('input', () => validateRoomCapacity())

// Валидация соответствия количества гостей от количества комнат - при изменении количества гостей:
capacityElement.addEventListener('input', () => validateRoomCapacity())

// Синхронизация цены и типа жилья
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
