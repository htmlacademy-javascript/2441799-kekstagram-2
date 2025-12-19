import {renderCards} from "./photos/thumbnails.js";
import './form.js';
import {updateScale, DEFAULT_VALUE} from './scale.js';
import './effect.js';
import { getData, sendData } from "./api.js";
import { showAlert } from "./util.js";
import { showImgFilters } from "./filter.js";

getData()
.then((pictures) => {
  renderCards(pictures);
  showImgFilters();
})
. catch (() => {
  showAlert();
});

updateScale(DEFAULT_VALUE);
