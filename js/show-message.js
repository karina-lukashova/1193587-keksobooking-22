import {isEscEvent} from './utils.js';

const DATA_ERROR_TIME = 3000;
const mainElement = document.querySelector('main')
const successMessageTemplate = document.querySelector('#success').content;
const successMessageElement = successMessageTemplate.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content;
const errorMessageElement = errorMessageTemplate.querySelector('.error');

// Функция показа ошибки, если не удалось получить данные с сервера:
const showDataError = () => {
  const errorTemplate = document.querySelector('#data-error').content;
  const errorMessageElement = errorTemplate.querySelector('.data-error').cloneNode(true);
  document.body.append(errorMessageElement);

  setTimeout(() => {
    errorMessageElement.remove();
  }, DATA_ERROR_TIME);
}

// Функция закрытия сообщения об успешной отправке
const closeSuccessMessage = () => {
  successMessageElement.remove();
  document.removeEventListener('keydown', onSuccessMessageKeydown);
  document.removeEventListener('click', closeSuccessMessage);
}

// Функции закрытия успешного сообщения при нажатии Esc
const onSuccessMessageKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}

// Функция закрытия сообщения о неудачной отправке
const closeErrorMessage = () => {
  errorMessageElement.remove();
  document.removeEventListener('keydown', onErrorMessageKeydown);
  document.removeEventListener('click', closeErrorMessage);
}

// Функции закрытия неудачного сообщения при нажатии Esc
const onErrorMessageKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
}

// Показ сообщения после успешной отправки формы
const showSuccessMessage = () => {
  mainElement.appendChild(successMessageElement);
  document.addEventListener('keydown', onSuccessMessageKeydown);
  document.addEventListener('click', closeSuccessMessage);
}

// Показ сообщения после неудачной отправки формы. Т.к. сообщение закрывается при клике на любой области экрана, то оно автоматически закрывается и при клике на кнопку .error__button - поэтому отдельно для него событие не делала.
const showErrorMessage = () => {
  mainElement.appendChild(errorMessageElement);
  document.addEventListener('keydown', onErrorMessageKeydown);
  document.addEventListener('click', closeErrorMessage);
}

export {showDataError, showSuccessMessage, showErrorMessage};
