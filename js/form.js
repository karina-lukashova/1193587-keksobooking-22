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
