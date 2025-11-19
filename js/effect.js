import { preview } from "vite";

const imgPreview = document.querySelector ('.img-upload__preview');
const effectSlider = document.querySelector ('.effect-level__slider');
const effectValue = document.querySelector ('.effect-level__value');
const effectsList = document.querySelector ('.effects__radio');
const effectLevelElement = document.querySelector ('.img-upload__effect-level');

let currentEffect = 'original'; //по умолчанию эффект оригинал
effectLevelElement.style.display = 'none'; //по умолчанию прячем слайдер

//настройки эффектов
const EFFECTS = {
  original: {
    filter: '',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
};

//настройки слайдера
noUiSlider.create(effectSlider, {
  start: 100,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  },
  step: 1
});

//когда слайдер движется, меняется фильтр
effectSlider.noUiSlider.on('update', ([value]) => {
  effectValue.value = value;

  const params = EFFECTS[currentEffect];

  if (currentEffect === 'original') {
    imgPreview.style.filter = '';
    return;
  }
  imgPreview.style.filter = `${params.filter}(${value}${params.unit})`;
});

//переключение эффектов
effectsList.forEach((radio) => {
  radio.addEventListener ('change', (evt) => {
    const value = evt.target.value;

    currentEffect = value === 'none' ? 'original' : value;

    const params = EFFECTS[currentEffect];

    //скрываем слайдер, если выбран Оригинал
    if (currentEffect === 'original') {
      effectLevelElement.style.display = 'none';
      imgPreview.style.filter = '';
      effectValue.value = '';
      return;
    }
    //для остальных эффектов
    effectLevelElement.style.display = '';
    effectSlider.noUiSlider.updateOptions ({
      start: params.max,
      range: {
        'min': params.min,
        'max': params.max
      },
      step: params.step
    });

    effectSlider.noUiSlider.set(params.max); //начальное значение
    imgPreview.style.filter = `${params.filter}(${params.max}${params.unit})`;
    effectValue.value = params.max;
  });
});
