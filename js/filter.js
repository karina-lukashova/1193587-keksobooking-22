const mapFilters = [...document.querySelector('.map__filters').children];
const typeFilterElement = document.querySelector('#housing-type');

// Функция блокировки фильтров - вызывается, если данные с сервера не получены
const blockFilters = () => {
  mapFilters.forEach(filter => filter.setAttribute('disabled', true));
};

// Фильтр по типу жилья - предикат
const isTypeTheSame = (stay) => {
  return typeFilterElement.value === 'any' ? true : stay.offer.type === typeFilterElement.value;
}

// Функция со всеми фильтрами
const filterStays = (stays) => {
  return stays.filter(stay => {
    return isTypeTheSame(stay);
    // Потом через && добавим предикаты остальных фильтров
  });
}

const setFiltersChange = (cb) => {
  typeFilterElement.addEventListener('input', cb);
  // Потом добавим событие input для каждого фильтра
}


export {blockFilters, filterStays, setFiltersChange};
