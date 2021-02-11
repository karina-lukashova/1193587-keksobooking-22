// Импорт модулей:
import {createStay} from './create-stay.js';

// Создаём массив объявлений
const getSimilarStays = (count) => {
  const similarStays = [];
  for (let i = 1; i <= count; i++) {
    similarStays.push(createStay());
  }
  return similarStays;
};

export {getSimilarStays};
