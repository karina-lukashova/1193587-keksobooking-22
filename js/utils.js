// Переменные-константы
const MIN_X_COORDINATE = 35.65000;
const MAX_X_COORDINATE = 35.70000;
const MIN_Y_COORDINATE = 139.70000;
const MAX_Y_COORDINATE = 139.80000;
const COORDINATE_DECIMALS = 5;

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

// Получаем случайный элемент массива:
const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

// Получаем уникальный массив из count элементов:
const getUniqueArray = (allArr, count) => {
  const newArr = [];
  for (let i = 1; i <= count; i++) {
    newArr.push(getRandomArrayElement(allArr));
  }
  const uniqueSet = new Set(newArr);
  return Array.from(uniqueSet);
}

// Получаем случайные координаты из заданного интервала
const getLocation = () => {
  return {
    x: getCoordinates(MIN_X_COORDINATE, MAX_X_COORDINATE, COORDINATE_DECIMALS),
    y: getCoordinates(MIN_Y_COORDINATE, MAX_Y_COORDINATE, COORDINATE_DECIMALS),
  };
}

// Создаем элемент разметки с одним классом
const createElementWithOneClass = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
}

// Создаем элемент разметки с двумя классами
const createElementWithTwoClasses = (tag, className1, className2) => {
  const element = document.createElement(tag);
  element.classList.add(className1);
  element.classList.add(className2);
  return element;
}

// Проверяем кнопку Esc
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

// Функция удаления всех детей
const deleteChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Вставляем создаем изображение и вставляем в контейнер
const pasteImage = (imageElement, container, src) => {
  const image = imageElement.cloneNode(true);
  image.src = src;
  container.appendChild(image);
}

export {getRandomInteger, getRandomArrayElement, getUniqueArray, getLocation, createElementWithOneClass, createElementWithTwoClasses, isEscEvent, deleteChildren, pasteImage};
