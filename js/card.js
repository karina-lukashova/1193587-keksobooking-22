import {createElementWithOneClass, createElementWithTwoClasses} from './utils.js';

const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;
const AVATAR_WIDTH = 70;
const AVATAR_HEIGHT = 70;

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapContainerElement = document.querySelector('#map-canvas');

const offerTypesMap = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
}

const createFeatures = (array) => {
  const featuresFragment = document.createDocumentFragment();
  array.forEach(feature => {
    const featureElement = createElementWithTwoClasses('li', 'popup__feature', 'popup__feature--' + feature);
    featuresFragment.appendChild(featureElement);
  })
  return featuresFragment;
}

const createPhotos = (array) => {
  const photosFragment = document.createDocumentFragment();
  array.forEach(photo => {
    const photoElement = createElementWithTwoClasses('img', 'popup__photo');
    photoElement.src = photo;
    photoElement.width = PHOTO_WIDTH;
    photoElement.height = PHOTO_HEIGHT;
    photosFragment.appendChild(photoElement);
  })
  return photosFragment;
}

const renderCard = ({author, offer}) => {
  const stayElement = cardTemplate.cloneNode(false);

  // Вставка аватара пользователя, если это есть в данных
  if (author.avatar) {
    const avatarElement = createElementWithOneClass('img', 'popup__avatar');
    avatarElement.width = AVATAR_WIDTH;
    avatarElement.height = AVATAR_HEIGHT;
    avatarElement.src = author.avatar;
    stayElement.appendChild(avatarElement);
  }

  // Вставка названия объявления, если это есть в данных
  if (offer.title) {
    const titleElement = createElementWithOneClass('h3', 'popup__title');
    titleElement.textContent = offer.title;
    stayElement.appendChild(titleElement);
  }

  // Вставка адреса объявления, если это есть в данных
  if (offer.title) {
    const addressElement = createElementWithTwoClasses('p', 'popup__text', 'popup__text--address');
    addressElement.textContent = offer.address;
    stayElement.appendChild(addressElement);
  }

  // Вставка стоимости объявления, если это есть в данных
  if (offer.price || offer.price === 0) {
    const priceElement = createElementWithTwoClasses('p', 'popup__text', 'popup__text--price');
    priceElement.textContent = `${offer.price} ₽/ночь`;
    stayElement.appendChild(priceElement);
  }

  // Вставка типа жилья, если это есть в данных
  if (offer.type) {
    const typeElement = createElementWithOneClass('h4', 'popup__type');
    typeElement.textContent = offerTypesMap[offer.type];
    stayElement.appendChild(typeElement);
  }

  // Вставка количества комнат и гостей, если это есть в данных
  if (offer.rooms && offer.guests) {
    const capacityElement = createElementWithTwoClasses('p', 'popup__text', 'popup__text--capacity');
    capacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    stayElement.appendChild(capacityElement);
  }

  // Вставка времени заезда и выезда, если это есть в данных
  if (offer.checkin && offer.checkout) {
    const timeElement = createElementWithTwoClasses('p', 'popup__text', 'popup__text--time');
    timeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    stayElement.appendChild(timeElement);
  }

  // Вставка дополнительных удобств жилья, если это есть в данных
  if (offer.features.length !== 0) {
    const featuresElement = createElementWithOneClass('ul', 'popup__features');
    featuresElement.appendChild(createFeatures(offer.features));
    stayElement.appendChild(featuresElement);
  }

  // Вставка описания объявления, если это есть в данных
  if (offer.description) {
    const descriptionElement = createElementWithOneClass('p', 'popup__description');
    descriptionElement.textContent = offer.description;
    stayElement.appendChild(descriptionElement);
  }

  // Вставка фотографий жилья, если это есть в данных
  if (offer.photos.length !== 0) {
    const photosElement = createElementWithOneClass('div', 'popup__photos');
    photosElement.appendChild(createPhotos(offer.photos));
    stayElement.appendChild(photosElement);
  }

  return stayElement;
}

const pasteCard = (card) => {
  mapContainerElement.appendChild(renderCard(card));
}

export {pasteCard};
