const ANY_VALUE = 'any';
const LOW_VALUE = 'low';
const MIDDLE_VALUE = 'middle';
const HIGH_VALUE = 'high';
const FILTER_VALUE = /filter-/;

const PriceRange = {
  MIN_MIDDLE: 10000,
  MIN_HIGH: 50000,
}

const mapFilters = [...document.querySelector('.map__filters').children];
const selectFilterElements = [...document.querySelectorAll('.map__filter')];
const featuresFilterElements = [...document.querySelectorAll('.map__checkbox')];
const typeFilterElement = document.querySelector('#housing-type');
const priceFilterElement = document.querySelector('#housing-price');
const roomsFilterElement = document.querySelector('#housing-rooms');
const guestsFilterElement = document.querySelector('#housing-guests');
const wifiFilterElement = document.querySelector('#filter-wifi');
const dishwasherFilterElement = document.querySelector('#filter-dishwasher');
const parkingFilterElement = document.querySelector('#filter-parking');
const washerFilterElement = document.querySelector('#filter-washer');
const elevatorFilterElement = document.querySelector('#filter-elevator');
const conditionerFilterElement = document.querySelector('#filter-conditioner');

// Функция блокировки фильтров - вызывается, если данные с сервера не получены
const blockFilters = () => {
  mapFilters.forEach(filter => filter.setAttribute('disabled', true));
};

// Фильтр по типу жилья - предикат
const isTypeTheSame = (stay) => {
  return typeFilterElement.value === ANY_VALUE ? true : stay.offer.type === typeFilterElement.value;
}

// Фильтр по цене - предикат
const isPriceTheSame = (stay) => {
  return priceFilterElement.value === ANY_VALUE ? true : (
    ((priceFilterElement.value === LOW_VALUE) && (stay.offer.price < PriceRange.MIN_MIDDLE)) ||
    ((priceFilterElement.value === HIGH_VALUE) && (stay.offer.price >= PriceRange.MIN_HIGH)) ||
    ((priceFilterElement.value === MIDDLE_VALUE) && (stay.offer.price >= PriceRange.MIN_MIDDLE) && (stay.offer.price < PriceRange.MIN_HIGH))
  );
}

// Фильтр по числу комнат - предикат
const isRoomsTheSame = (stay) => {
  return roomsFilterElement.value === ANY_VALUE ? true : stay.offer.rooms.toString() === roomsFilterElement.value;
}

// Фильтр по числу гостей - предикат
const isGuestsTheSame = (stay) => {
  return guestsFilterElement.value === ANY_VALUE ? true : stay.offer.guests.toString() === guestsFilterElement.value;
}

// Фильтр по дополнительным удобствам
const isFeatureTheSame = (featureElement, stay) => {
  const featureName = featureElement.getAttribute('id').replace(FILTER_VALUE, '');
  return featureElement.checked === false ? true  : stay.offer.features.includes(featureName);
}

// Функция со всеми фильтрами
const filterStays = (stays) => {
  return stays.filter(stay => {
    return isTypeTheSame(stay)&&
    isPriceTheSame(stay)&&
    isRoomsTheSame(stay)&&
    isGuestsTheSame(stay)&&
    isFeatureTheSame(wifiFilterElement, stay)&&
    isFeatureTheSame(dishwasherFilterElement, stay)&&
    isFeatureTheSame(parkingFilterElement, stay)&&
    isFeatureTheSame(washerFilterElement, stay)&&
    isFeatureTheSame(elevatorFilterElement, stay)&&
    isFeatureTheSame(conditionerFilterElement, stay);
  });
}

const setFiltersChange = (cb) => {
  selectFilterElements.forEach(select => {
    select.addEventListener('input', cb);
  })
  featuresFilterElements.forEach(feature => {
    feature.addEventListener('input', cb);
  })
}


export {blockFilters, filterStays, setFiltersChange};
