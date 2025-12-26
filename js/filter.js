import { renderCards } from './photos/thumbnails.js';
import { debounce } from './util.js';

const RANDOM_PICTURES_COUNT = 10;

const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

let pictures = [];

export const setPictures = (data) => {
  pictures = data;
};

const clearThumbnail = () => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
};

const setActiveButton = (button) => {
  if (!button.classList.contains('img-filters__button')) {
    return;
  }

  const currentActiveButton = imgFiltersForm.querySelector('.img-filters__button--active');

  if (currentActiveButton) {
    currentActiveButton.classList.remove('img-filters__button--active');
  }

  button.classList.add('img-filters__button--active');
};

const applyDefaultFilter = () => {
  clearThumbnail();

  renderCards(pictures);
};

const applyRandomFilter = () => {
  clearThumbnail();

  const randomPictures = pictures
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, RANDOM_PICTURES_COUNT);

  renderCards(randomPictures);
};

const applyDiscussedFilter = () => {
  clearThumbnail();

  const sortedPictures = pictures
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);

  renderCards(sortedPictures);
};

const onFilterClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

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

const onFilterClickDebounced = debounce(onFilterClick);

export const showImgFilters = () => {
  if (!imgFiltersElement || !imgFiltersForm) {
    return;
  }

  imgFiltersElement.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    onFilterClickDebounced(evt);
  });
};
