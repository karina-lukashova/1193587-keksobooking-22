import {hideElement} from './utils.js';
import {getSimilarStays} from './data.js';

const SIMILAR_STAYS_COUNT = 10;

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapContainer = document.querySelector('#map-canvas');

const similarStays = getSimilarStays(SIMILAR_STAYS_COUNT);
const stays = [];

similarStays.forEach(({author, offer}) => {
  const stayElement = cardTemplate.cloneNode(true);

  // Вставка аватара пользователя
  stayElement.querySelector('.popup__avatar').src = author.avatar;
  hideElement(author.avatar, stayElement.querySelector('.popup__avatar'));

  // Вставка названия объявления
  stayElement.querySelector('.popup__title').textContent = offer.title;
  hideElement(offer.title, stayElement.querySelector('.popup__title'));

  // Вставка адреса объявления
  stayElement.querySelector('.popup__text--address').textContent = offer.address;
  hideElement(offer.address, stayElement.querySelector('.popup__text--address'));

  // Вставка стоимости объявления
  stayElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  hideElement(offer.price, stayElement.querySelector('.popup__text--price'));

  // Вставка типа жилья
  switch (offer.type) {
    case 'palace':
      stayElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'flat':
      stayElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalow':
      stayElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      stayElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    default:
      stayElement.querySelector('.popup__type').classList.add('hidden');
  }

  // Вставка количества комнат и гостей
  stayElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  hideElement(offer.rooms, stayElement.querySelector('.popup__text--capacity'));
  hideElement(offer.guests, stayElement.querySelector('.popup__text--capacity'));
  stayElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  hideElement(offer.checkin, stayElement.querySelector('.popup__text--time'));
  hideElement(offer.checkout, stayElement.querySelector('.popup__text--time'));

  // Вставка дополнительных удобств жилья
  const popupFeatures = stayElement.querySelectorAll('.popup__feature');
  popupFeatures.forEach((popupFeature) => {
    popupFeature.classList.add('hidden');
  })
  offer.features.forEach((feature) => {
    const featureClass = '.popup__feature--' + feature;
    stayElement.querySelector(featureClass).classList.remove('hidden');
  })

  // Вставка описания объявления
  stayElement.querySelector('.popup__description').textContent = offer.description;
  hideElement(offer.description, stayElement.querySelector('.popup__description'));

  // Вставка фотографий жилья
  const photosContainer = stayElement.querySelector('.popup__photos');
  const photoTemplate = stayElement.querySelector('.popup__photo');
  photoTemplate.remove();
  offer.photos.forEach(photoSrc => {
    const photo = photoTemplate.cloneNode(true);
    photo.src = photoSrc;
    photosContainer.appendChild(photo);
  })

  stays.push(stayElement);
})

mapContainer.appendChild(stays[0]);

export {};
