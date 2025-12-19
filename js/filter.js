const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

//функция убирает отрисованные фотографии
const clearThumbnail = () => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
};

//функция переключает активность кнопки
const setActiveButton = (button) => {
  imgFiltersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};



//функция для показа блока фильтров
export const showImgFilters = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};
