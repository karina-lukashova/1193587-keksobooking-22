const mapFilters = [...document.querySelector('.map__filters').children];
const typeFilterElement = document.querySelector('#housing-type');

// Функция блокировки фильтров - вызывается, если данные с сервера не получены
const blockFilters = () => {
  mapFilters.forEach(filter => filter.setAttribute('disabled', true));
};

// Фильтр по типу жилья
const filterByType = (stays) => {
  if (typeFilterElement.value !== 'any') {
    const filteredStays = stays.filter(stay => stay.offer.type === typeFilterElement.value)
    return filteredStays;
  } else {
    return stays;
  }
};

const setTypeFilterChange = (cb) => {
  typeFilterElement.addEventListener('input', () => {
    cb();
  })
};


export {blockFilters, filterByType, setTypeFilterChange};
