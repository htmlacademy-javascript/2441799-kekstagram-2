import { photoArray } from "../data";

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

photoArray.forEach (({id, url, description, comments, likes}) => {
  const thumbnail = template.cloneNode (true);

  thumbnail.dataset.pictureId = id;
  const image = thumbnail.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  fragment.appendChild(thumbnail);
});

container.appendChild(fragment);

export {container};
