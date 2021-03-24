/* global _:readonly */
import {pasteCards} from './map.js';
import {blockFilters, setFiltersChange} from './filter.js';
import {showDataError} from './show-message.js'

const REPASTE_DELAY = 500;

const getData = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((stays) => onSuccess(stays))
    .catch((err) => onError(err));
};

// Заключила в функцию, чтобы переиспользовать при активации страницы и при очистке/успешной отправке формы (сброс отфильтрованных меток)
const getStaysData = () => {
  getData((stays) => {
    pasteCards(stays);
    setFiltersChange(_.debounce(
      () => pasteCards(stays),
      REPASTE_DELAY,
    ));
  }, (err) => {
    showDataError(err);
    blockFilters();
  });
}

const sendData = (formData, onSuccess, onError) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error;
      }
    })
    .catch(() => {
      onError();
    });
};

export {getStaysData, sendData};
