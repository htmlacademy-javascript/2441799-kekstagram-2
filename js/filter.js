import { renderCards } from "./photos/thumbnails.js";

const RANDOM_PICTURES_COUNT = 10;
const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

export let pictures = [];
export const setPictures = (data) => {
  pictures = data;
};

//функция убирает отрисованные фотографии
const clearThumbnail = () => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
};

//функция переключает активность кнопки
const setActiveButton = (button) => {
  const currentActiveButton = imgFiltersForm.querySelector('.img-filters__button--active');

  if (currentActiveButton) {
    currentActiveButton.classList.remove('img-filters__button--active');
  }

  button.classList.add('img-filters__button--active');
};

//фильтр по-умолчанию
const applyDefaultFilter = () => {
  clearThumbnail();

  renderCards(pictures);
};

//фильтр случайные
const applyRandomFilter = () => {
  clearThumbnail();

  const randomPictures = pictures
  .slice()
  .sort(() => 0.5 - Math.random())
  .slice(0, RANDOM_PICTURES_COUNT);

  renderCards(randomPictures);
};

//фильтр обсуждаемые
const applyDiscussedFilter = () => {
  clearThumbnail();

  const sortedPictures = pictures
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);

  renderCards(sortedPictures);
};

//обработчик клика на фильтры
const onFilterClick = (evt) => {
  if(!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  setActiveButton(evt.target);

  switch (evt.target.id) {
    case 'filter-default':
    applyDefaultFilter();
    break;

    case 'filter-random':
    applyRandomFilter();
    break;

    case 'filter-discussed':
    applyDiscussedFilter();
    break;
  }
};

//функция для показа блока фильтров
export const showImgFilters = () => {
  if(!imgFiltersElement || !imgFiltersForm) {
    return;
  }

  imgFiltersElement.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', onFilterClick)
};
