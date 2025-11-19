const controlSmaller = document.querySelector ('.scale__control--smaller');
const controlBigger = document.querySelector ('.scale__control--bigger');
export const controlValue = document.querySelector ('.scale__control--value');
export const imgPreview = document.querySelector ('.img-upload__preview img');

const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
export const DEFAULT_VALUE = 100;

//обновление масштаба
export const updateScale = (newValue) => {
  const clamped = Math.min(MAX_VALUE, Math.max(MIN_VALUE, newValue));
  controlValue.value = `${clamped}%`;
  imgPreview.style.transform = `scale(${clamped / 100})`;
};

//увеличение
controlBigger.addEventListener('click', () => {
  const current = parseInt(controlValue.value, 10);
  updateScale(current + STEP);
});

//уменьшение
controlSmaller.addEventListener('click', () => {
  const current = parseInt(controlValue.value, 10);
  updateScale(current - STEP);
});

export function resetScale () {
  controlValue.value = DEFAULT_VALUE;
  imgPreview.style.transform = 'scale(1)';
};
