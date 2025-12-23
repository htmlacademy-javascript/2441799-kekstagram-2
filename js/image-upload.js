import { resetEffects } from "./effect.js";
import { DEFAULT_VALUE, imgPreview, updateScale } from "./scale.js";

export const initUpload = () => {
  const uploadInput = document.querySelector('.img-upload__input');
  const uploadPreview = document.querySelector('.img-upload__preview img');

  const FILE_TYPES = ['jpg', 'jpeg', 'png'];

  if (!uploadInput || !uploadPreview) return;

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];

    if (!file) return;

    const fileName = file.name.toLowerCase();
    const isValidType = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (!isValidType) {
      alert('Выберите изображение в формате JPG, JPEG или PNG!');
      uploadInput.value = ''; // сброс выбранного файла
      return;
    }

    const fileURL = URL.createObjectURL(file);
    imgPreview.src = fileURL;

    //обновляем миниатюры эффектов
    const effectsPreviews = document.querySelectorAll('.effects__preview');
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileURL})`;
    });

    //сброс масштаба и эффектов
    updateScale(DEFAULT_VALUE);
    resetEffects();
  });
};
