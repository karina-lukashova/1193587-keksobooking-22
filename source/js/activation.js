const formElement = document.querySelector('.ad-form');
const formBlocks = [...document.querySelector('.ad-form').children];
const mapFiltersForm = document.querySelector('.map__filters');
const mapFilters = [...document.querySelector('.map__filters').children];
const adressElement = document.querySelector('#address');

const setDefault = () => {
  formElement.classList.add('ad-form--disabled');
  formBlocks.forEach(block => block.setAttribute('disabled', true));
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFilters.forEach(filter => filter.setAttribute('disabled', true));
  adressElement.readOnly = true;
};

const activateSite = () => {
  formElement.classList.remove('ad-form--disabled');
  formBlocks.forEach(block => block.removeAttribute('disabled'));
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFilters.forEach(filter => filter.removeAttribute('disabled'));
};

export {setDefault, activateSite};
