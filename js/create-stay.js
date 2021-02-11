// Импорт модулей:
import {getRandomInteger, getCoordinates, getRandomArrayElement, getUniqueArray} from './util.js';

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

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]

const PHOTOS = [
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

const AVATARS_COUNT = 8;
const MAX_PRICE = 1000000;
const MAX_ROOMS_COUNT = 100;
const MAX_GUESTS_COUNT = 100;
const MIN_X_COORDINATE = 35.65000;
const MAX_X_COORDINATE = 35.70000;
const MIN_Y_COORDINATE = 139.70000;
const MAX_Y_COORDINATE = 139.80000;
const COORDINATE_DECIMALS = 5;

// Получаем случайные координаты из заданного интервала
const getLocation = () => {
  return {
    x: getCoordinates(MIN_X_COORDINATE, MAX_X_COORDINATE, COORDINATE_DECIMALS),
    y: getCoordinates(MIN_Y_COORDINATE, MAX_Y_COORDINATE, COORDINATE_DECIMALS),
  };
}

// Создаём объявление
const createStay = () => {
  const featuresCount = getRandomInteger(0, FEATURES.length); // От нуля, т.к. предполагаю, что есть жилье без этих доп. удобств
  const photosCount = getRandomInteger(1, PHOTOS.length);
  const coordinates = getLocation();

  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(1, AVATARS_COUNT)}.png`,
    },

    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${coordinates.x}, ${coordinates.y}`,
      price: getRandomInteger(0, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, MAX_ROOMS_COUNT),
      guests: getRandomInteger(0, MAX_GUESTS_COUNT),
      checkin: getRandomArrayElement(CHECKIN_OUT_HOURS),
      checkout: getRandomArrayElement(CHECKIN_OUT_HOURS),
      features: getUniqueArray(FEATURES, featuresCount),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getUniqueArray(PHOTOS, photosCount),
    },

    location: coordinates,
  }
};

export {createStay};
