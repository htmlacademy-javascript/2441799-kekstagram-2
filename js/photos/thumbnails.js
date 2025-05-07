import { photoArray } from "../data";

//получаем шаблон карточки фотографии
const template = document.querySelector('#picture').content.querySelector('.picture');

//получает первое фото массива
const photo = photoArray[0];

//заполнить данные
const image = template.querySelector('.picture__img');
image.src = photo.url;
image.alt = photo.description;

template.querySelector('.picture__likes').textContent = photo.likes;
template.querySelector('.picture__comments').textContent = photo.comments.length;

//добавить карточку в контейнер
const container = document.querySelector('.pictures');
container.appendChild(template);
