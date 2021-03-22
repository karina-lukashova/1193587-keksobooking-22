/* global _:readonly */
import './form.js';
import {getData} from './server.js';
import {pasteCards} from './map.js';
import {showDataError} from './show-message.js'
import {blockFilters, setFiltersChange} from './filter.js';
import './images.js';

const REPASTE_DELAY = 500;

// Вызов функции получения данных
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
