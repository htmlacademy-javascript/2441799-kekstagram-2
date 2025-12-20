import { resetEffects } from "./effect.js";
import { DEFAULT_VALUE, imgPreview, updateScale } from "./scale.js";

export const initUpload = () => {
  const uploadInput = document.querySelector('.img-upload__input');
  const uploadPreview = document.querySelector('.img-upload__preview img');

  if (!uploadInput || !uploadPreview) return;

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const fileURL = reader.result;
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

    reader.readAsDataURL(file);
  });

};
