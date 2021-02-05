'use strict'

// Фунция для поиска случайного числа в заданном интервале включительно. Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5
const getRandomNumber = (min, max) => {
  if (min > max) {
    return 0;
  }
  let result = Math.random() * (max - min + 1) + min;
  return result > max ? max : result;
}

// Функция, возвращающая случайное целое число из переданного диапазона включительно. Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE
const getRandomInteger = (min, max) => {
  return Math.floor(getRandomNumber(min, max));
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
const getCoordinates = (min, max, digits) => {
  if (min > max) {
    return '0';
  }
  return getRandomNumber(min, max).toFixed(digits);
}

// Создание массива из объявлений:

// Переменные-константы:
const TITLES = [
  'Студия в традиционном стиле',
  'Двухкомнатная квартира со всеми удобствами',
  'Квартира с прекрасным видом на Tokyo Skytree',
  'Жильё в историческом центре',
  'Современные аппартаменты в районе Гиндза',
  'Скромная студия с самым необходимым',
  'Королевский дворец в пригороде',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKIN_OUT_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const ALL_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]

const ALL_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]

const DESCRIPTIONS = [
  'Небольшая студия в истинно японском стиле погрузит вас в атмосферу страны восходящего солнца. Почувствуй себя коренным жителем!',
  'Стандартная квартира для двоих человек с современной техникой в безопасном районе Токио.',
  'Из наших панорамных окон вы увидите всю красоту города, а также великолепную Tokyo Skytree, самую высокую телебашню мира',
  'Поселившись у нас в самом центре города, вы пешком сможете обойти главные достопримечательности Токио',
  'Добро пожаловать в один из самых роскошных районов Токио! В шаговой доступности от квартиры лучшие рестораны, бары и культурные развлечения',
  'За небольшую цену вы получите полноценную студию с собственной ванной и мини-кухней',
  'Почувствуйте себя королём в нашем дворце! В вашем распоряжении личный онсен, кинозал и прекрасная веранда с видом на собственный парк',
];

const SIMILAR_STAYS_COUNT = 10;

// Переменные и функции расчета:
const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

// Сначала попробовала сделать уникальный массив через Set, но этот способ оказался в 6 раз медленнее, чем способ через Array.some (проверила на массиве из 5000 элементов). Но на всякий случай оставила код с Set (ниже на примере features) - насколько он в целом выглядит адекватно?)
// let features = [];
// while (features.length !== 5000) {
//   features.splice(features.length - 1, 0, getRandomArrayElement(ALL_FEATURES));
//   const featuresSet = new Set(features);
//   features = Array.from(featuresSet);
// }

// А вот это рабочий:
const getUniqueArray = function (allArr, count) {
  const newArr = [];
  while (newArr.length !== count) {
    const item = getRandomArrayElement(allArr);
    if (!newArr.some(value => item === value)) {
      newArr.splice(0, 0, item);
    }
  }
  return newArr;
}

// Функции для получения объектов объявлений:

const getAuthor = function () {
  const author = {
    avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png`,
  };
  return author;
}

let coordinates = {};
const getLocation = function () {
  const location = {
    x: getCoordinates(35.65000, 35.70000, 5),
    y: getCoordinates(139.70000, 139.80000, 5),
  };
  coordinates = location;
  return location;
}

const getOffer = function () {
  const featuresCount = getRandomInteger(0, ALL_FEATURES.length); // От нуля, т.к. предполагаю, что есть жилье без этих доп. удобств
  const photosCount = getRandomInteger(1, ALL_PHOTOS.length);

  const offer = {
    title: getRandomArrayElement(TITLES),
    address: `${coordinates.x}, ${coordinates.y}`,
    price: getRandomInteger(0, 1000000), // В ТЗ максимальное значение = 1 000 000, поэтому поставила его как максимальное. Включила 0, т.к. в ТЗ минимальная цена на "Бунгало" - 0 рублей
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInteger(1, 100), // Подумала, что вряд ли будет жилье больше 100 комнат :) Плюс, в ТЗ 100 комнат значится уже как "не для гостей" - приняла это за максимум
    guests: getRandomInteger(0, 100), // По ТЗ прослеживается связь: 1 комната = 1 человек. Поэтому временно поставила здесь максимум такой же, как для rooms. От нуля, т.к. при 100 комнатах по условию - не для гостей, значит их 0
    checkin: getRandomArrayElement(CHECKIN_OUT_HOURS),
    checkout: getRandomArrayElement(CHECKIN_OUT_HOURS),
    features: getUniqueArray(ALL_FEATURES, featuresCount),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getUniqueArray(ALL_PHOTOS, photosCount),
  };
  return offer;
}

// Создаём объявление
const createStay = () => {
  return {
    author: getAuthor(),
    location: getLocation(), // Поставила location перед offer, т.к. по условию задачи адрес в offer должен ссылаться на location
    offer: getOffer(),
  }
};

const similarStays = new Array(SIMILAR_STAYS_COUNT).fill(null).map(() => createStay());
similarStays; //Написала это, чтобы eslint не ругался на similarStays, которую мы создали, но не использовали
