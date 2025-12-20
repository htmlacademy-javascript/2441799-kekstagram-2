import { renderCards } from "./photos/thumbnails";

const RANDOM_PICTURES_COUNT = 10;
const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
let pictures = [];

//функция убирает отрисованные фотографии
const clearThumbnail = () => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
};

//функция переключает активность кнопки
const setActiveButton = (button) => {
  imgFiltersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
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
    .sort((a, b) => b.commens.length - a.comments.length);

    renderCards(sortedPictures);
};


//функция для показа блока фильтров
export const showImgFilters = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};
