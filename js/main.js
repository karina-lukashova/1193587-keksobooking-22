import './form.js';
import {getData} from './server.js';
import {pasteCards} from './map.js';
import {showDataError} from './show-message.js'
import {blockFilters, setTypeFilterChange} from './filter.js';

// Вызов функции получения данных
getData((stays) => {
  pasteCards(stays);
  setTypeFilterChange(() => pasteCards(stays));
}, (err) => {
  showDataError(err);
  blockFilters();
});
