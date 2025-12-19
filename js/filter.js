const filterElement = document.querySelector('.img-filters');

//функция для показа блока фильтров
export const showImgFilters = () => {
  filterElement.classList.remove('img-filters--inactive');
};
