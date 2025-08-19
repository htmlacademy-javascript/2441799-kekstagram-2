import { photoArray } from "../data";
import { openBigPicture } from "./fullphoto";

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

photoArray.forEach (({id, url, description, comments, likes}) => {
  const picture = pictureTemplate.cloneNode (true);

  picture.dataset.pictureId = id;
  const image = picture.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  //обработчик клика
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(id);
  });

  picturesFragment.appendChild(picture);
});

pictures.appendChild(picturesFragment);

export {pictures};
