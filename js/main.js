import { renderCards } from './photos/thumbnails.js';
import './form.js';
import { updateScale, DEFAULT_VALUE } from './scale.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { setPictures, showImgFilters } from './filter.js';
import { initUpload } from './image-upload.js';

getData()
  .then((data) => {
    setPictures(data.slice());
    renderCards(data);
    showImgFilters();
  })
  .catch(() => {
    showAlert();
  });

updateScale(DEFAULT_VALUE);
initUpload();
