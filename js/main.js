import {photoArray} from "./data.js";
import {renderCards} from "./photos/thumbnails.js";
import './form.js';
import {updateScale, DEFAULT_VALUE} from './slider.js';

console.log (photoArray);
renderCards(photoArray);
updateScale(DEFAULT_VALUE);
