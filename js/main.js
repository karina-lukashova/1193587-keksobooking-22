import './form.js';
import {getData} from './server.js';
import {pasteCards} from './map.js';
import {showDataError} from './show-message.js'

// Вызов функции получения данных
// getData((stays) => pasteCards(stays), (err) => showDataError(err));
getData(pasteCards, showDataError);
