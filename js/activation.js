const formElement = document.querySelector('.ad-form');
const formBlocks = [...document.querySelector('.ad-form').children];
const mapFilters = [...document.querySelector('.map__filters').children];
let isClose = true;

const deactivateSite = () => {
  if (isClose) {
    formElement.classList.add('ad-form--disabled');
    formBlocks.forEach(block => block.disabled = 'true');
    mapFilters.forEach(filter => filter.disabled = 'true');
  }
};

const activateSite = () => isClose = false;

export {deactivateSite, activateSite};
