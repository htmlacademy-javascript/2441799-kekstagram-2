import { openBigPicture } from './fullphoto.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

let localPhotos;

export const renderCards = (photos) => {
  localPhotos = [...photos];
  photos.forEach(({ id, url, description, comments, likes }) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.dataset.pictureId = id;
    const image = picture.querySelector('.picture__img');
    image.src = url;
    image.alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    picturesFragment.appendChild(picture);
  });
  pictures.appendChild(picturesFragment);
};

pictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (!currentPicture) {
    return;
  }

  const pictureId = Number(currentPicture.dataset.pictureId);
  const currentPhoto = localPhotos.find((photo) => photo.id === pictureId);
  openBigPicture(currentPhoto);
});
