'use strict'

// Функция, возвращающая случайное целое число из переданного диапазона включительно:
const getRandomNumber = (min, max) => {
  if (min > max) {
    return 'Значение \'до\' должно быть больше значения \'от\'';
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно:
const getNumberWithDigits = (min, max, digits) => {
  if (min > max) {
    return 'Значение \'до\' должно быть больше значения \'от\'';
  }
  return (Math.random() * (max - min) + min).toFixed(digits);
}

// Примеры:
getRandomNumber(22,65);
getNumberWithDigits(22, 54, 2);
