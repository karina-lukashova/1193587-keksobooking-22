import './form.js';
import {pasteCards, setDefaultMainMarker} from './map.js';
import {setUserFormSubmit, setDefaultForm, setDefaultFilters} from './form.js'
import {showDataError, showSuccessMessage} from './show-message.js'

// Запрос данных и ошибка если пошло не так
fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((stays) => pasteCards(stays))
  .catch(() => showDataError());

// Функция сброса до Default
const setDefaultPage = () => {
  showSuccessMessage();
  setDefaultMainMarker();
  setDefaultForm();
  setDefaultFilters();
}

// Отправка формы
setUserFormSubmit(setDefaultPage);
