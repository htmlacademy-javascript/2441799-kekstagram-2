import { renderCards } from "./photos/thumbnails.js";
import './form.js';
import { updateScale, DEFAULT_VALUE } from './scale.js';
import './effect.js';
import { getData } from "./api.js";
import { showAlert } from "./util.js";
import { setPictures, showImgFilters, pictures} from "./filter.js";

getData()
.then((data) => {
  setPictures(data.slice());
  renderCards(pictures);
  showImgFilters();
})
.catch (() => {
  showAlert();
});

updateScale(DEFAULT_VALUE);
