import { container } from "./thumbnails";

const bigPicture = document.querySelector('.big-picture');

container.addEventListener('click', (evt) => {
  bigPicture.classList.remove('hidden');
});
