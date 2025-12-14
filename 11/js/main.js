import {photoArray} from "./data.js";
import {renderCards} from "./photos/thumbnails.js";
import './form.js';
import {updateScale, DEFAULT_VALUE} from './scale.js';
import './effect.js';
import { getData, sendData } from "./api.js";
import { showAlert } from "./util.js";

getData()
.then((pictures) => {
  renderCards(pictures);
})
. catch ((error) => {
  showAlert(error);
});

console.log (photoArray);
renderCards(photoArray);
updateScale(DEFAULT_VALUE);
