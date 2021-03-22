import {mainMarker, setDefaultMainMarker} from './map.js';
import {showSuccessMessage, showErrorMessage} from './show-message.js'
import {sendData} from './server.js';
import {avatarPreview, stayPhotoPreview} from './images.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE = 0;
const MAX_CAPACITY = '100';
const MAX_PRICE = 1000000;
const DIGITS_NUMBER = 5;

const stayForm = document.querySelector('.ad-form');
const stayTypeElement = document.querySelector('#type');
const stayPriceElement = document.querySelector('#price');
const stayTimeInElement = document.querySelector('#timein');
const stayTimeOutElement = document.querySelector('#timeout');
const titleElement = document.querySelector('#title');
const priceElement = document.querySelector('#price');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const filterFormElement = document.querySelector('.map__filters');

const minPriceForTypeMap = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

// Функция валидации текста на нужное количество символов:
const onTextInput = ({currentTarget}) => {
  const titleLength = currentTarget.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    currentTarget.setCustomValidity('Введите ещё ' + (MIN_TITLE_LENGTH - titleLength) +' симв.');
  } else if (titleLength > MAX_TITLE_LENGTH) {
    currentTarget.setCustomValidity('Удалите лишние ' + (titleLength - MAX_TITLE_LENGTH) +' симв.');
  } else {
    currentTarget.setCustomValidity('');
  }

  currentTarget.reportValidity();
}

// Функция валидации цены на минимум и максимум:
const onPriceInput = ({currentTarget}) => {
  const priceValue = currentTarget.value;
  if (priceValue < MIN_PRICE) {
    currentTarget.setCustomValidity('Цена должна быть минимум 0 рублей');
  } else if (priceValue > MAX_PRICE) {
    currentTarget.setCustomValidity('Цена должна быть максимум 1 000 000 рублей');
  } else {
    currentTarget.setCustomValidity('');
  }

  currentTarget.reportValidity();
}

// Функция валидации количества комнат и гостей:
const onCapacityInput = (value) => {
  if (value === MAX_CAPACITY && capacityElement.value!=='0') {
    capacityElement.setCustomValidity('100 комнат может быть только "не для гостей"');
  } else if (value!==MAX_CAPACITY && capacityElement.value=='0') {
    capacityElement.setCustomValidity('Выберите количество гостей, оно не может равняться 0');
  } else if (value < capacityElement.value) {
    capacityElement.setCustomValidity(`Количество гостей должно быть не больше ${value}`);
  } else {
    capacityElement.setCustomValidity('');
  }

  capacityElement.reportValidity();
}

// Функция установки минимальной цены:
const onStayTypeInput = () => {
  stayPriceElement.min = minPriceForTypeMap[stayTypeElement.value];
  stayPriceElement.placeholder = minPriceForTypeMap[stayTypeElement.value];
}

// Функция синхронизации времени:
const synchronizeTime = (firstTime, secondTime) => {
  firstTime.addEventListener('input', () => secondTime.value = firstTime.value);
}

// Валидация названия объявления:
titleElement.addEventListener('input', onTextInput);

// Валидация цены:
priceElement.addEventListener('input', onPriceInput);

// Валидация соответствия количества гостей от количества комнат - при изменении количества комнат:
roomNumberElement.addEventListener('input', () => onCapacityInput(roomNumberElement.value));

// Валидация соответствия количества гостей от количества комнат - при изменении количества гостей:
capacityElement.addEventListener('input', () => onCapacityInput(roomNumberElement.value));

// Синхронизация цены и типа жилья
stayTypeElement.addEventListener('input', onStayTypeInput);

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

// Сброс формы, фильтров и маркера до default
const onStayFormReset = () => {
  stayForm.reset();
  stayPriceElement.min = 0;
  stayPriceElement.placeholder = 0;
  avatarPreview.src = 'img/muffin-grey.svg';
  stayPhotoPreview.src = 'img/muffin-grey.svg';
  filterFormElement.reset();
  setDefaultMainMarker();
}

// Ресет формы
stayForm.addEventListener('reset', onStayFormReset)

// Функция после успешной отправки данных формы
const sendSuccessForm = () => {
  showSuccessMessage();
  onStayFormReset();
}

// Функция для отправки формы
const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(formData, sendSuccessForm, showErrorMessage);
}

// Отправка формы
stayForm.addEventListener('submit', (evt) => onFormSubmit(evt))
