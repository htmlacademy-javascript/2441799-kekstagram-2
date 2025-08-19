import {photoArray} from "./data";
console.log(photoArray);

import './photos/thumbnails.js';
import './photos/fullphoto.js';
import { pictures } from "./photos/thumbnails.js";
import { openBigPicture } from "./photos/fullphoto.js";

pictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closet('.picture');

  if (currentPicture) {
    openBigPicture(currentPicture.dataset.pictureId);
  }
});
