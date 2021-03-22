import './form.js';
import {getData} from './server.js';
import {pasteCards} from './map.js';
import {showDataError} from './show-message.js'
import {blockFilters, setFiltersChange} from './filter.js';

// Вызов функции получения данных
getData((stays) => {
  pasteCards(stays);
  setFiltersChange(() => pasteCards(stays));
}, (err) => {
  showDataError(err);
  blockFilters();
});
