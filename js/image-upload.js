import { resetEffects } from './effect.js';
import { DEFAULT_VALUE, imgPreview, updateScale } from './scale.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const effectsPreviews = document.querySelectorAll('.effects__preview');

export const initUpload = () => {
  const uploadInput = document.querySelector('.img-upload__input');
  const uploadPreview = document.querySelector('.img-upload__preview img');

  if (!uploadInput || !uploadPreview) {
    return;
  }

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const isValidType = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (!isValidType) {
      uploadInput.value = '';
      return;
    }

    const fileURL = URL.createObjectURL(file);
    imgPreview.src = fileURL;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileURL})`;
    });

    updateScale(DEFAULT_VALUE);
    resetEffects();
  });
};
