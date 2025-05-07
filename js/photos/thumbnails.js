import { photoArray } from "../data";

//получаем шаблон карточки фотографии
const template = document.querySelector('#picture').content.querySelector('.picture');

photoArray.forEach ((photo) => {
  const thumbnail = template.cloneNode (true);
  //заполнить данные
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

//добавить карточку в контейнер
const container = document.querySelector('.pictures');
container.appendChild(thumbnail);
});
