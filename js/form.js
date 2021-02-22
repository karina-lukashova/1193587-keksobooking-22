const stayType = document.querySelector('#type');
const stayPrice = document.querySelector('#price');
const stayTimeIn = document.querySelector('#timein');
const stayTimeOut = document.querySelector('#timeout');

const minPriceForTypeMap = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const timeMap = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00',
}

const setMinPrice = () => {
  stayPrice.min = minPriceForTypeMap[stayType.value];
  stayPrice.placeholder = minPriceForTypeMap[stayType.value];
}

const synchronizeTime = (firstTime, secondTime) => {
  firstTime.addEventListener('change', () => secondTime.value = timeMap[firstTime.value]);
}

// Если человек сразу выберет квартиру (т.к. она изначально selected), то на нее не надо переключаться и change не сработает. Поэтому устанавливаю минимум не только на событие 'change', а по умолчанию
setMinPrice()

stayType.addEventListener('change', () => {
  setMinPrice()
})

// Синхронизацию времени делаю только на 'change', т.к. по умолчанию время и выезда, и заезда '12:00'
synchronizeTime(stayTimeIn, stayTimeOut);
synchronizeTime(stayTimeOut, stayTimeIn);
