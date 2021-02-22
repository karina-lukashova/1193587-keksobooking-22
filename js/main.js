import {getSimilarStays} from './data.js';
import {pasteCard} from './card.js';

const SIMILAR_STAYS_COUNT = 10;

const similarStays = getSimilarStays(SIMILAR_STAYS_COUNT);
pasteCard(similarStays[0]);
