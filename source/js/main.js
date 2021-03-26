/* global _:readonly */
import './form.js';
import {getData} from './server.js';
import './images.js';
import {pasteCards} from './map.js';
import {blockFilters, setFiltersChange} from './filter.js';
import {showDataError} from './show-message.js'
import {setformReset, setFormSubmit} from './form.js';

const REPASTE_DELAY = 500;

getData((stays) => {
  pasteCards(stays);
  setFiltersChange(_.debounce(
    () => pasteCards(stays),
    REPASTE_DELAY,
  ));
  setformReset(() => pasteCards(stays));
  setFormSubmit(() => pasteCards(stays));
}, (err) => {
  showDataError(err);
  blockFilters();
});
