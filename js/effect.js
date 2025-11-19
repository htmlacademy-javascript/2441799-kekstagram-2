const imgPreview = document.querySelector ('.img-upload__preview');
const slider = document.querySelector ('.effect-level__slider');
const radio = document.querySelector ('.effects__radio');

let currentEffect = 'None';

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

//слайдер
const sliderSetting = noUiSlider.create(slider, {
  start: 100,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  },
  step: 1,
  format: {
    to: value => Number(value),
    from: value => Number(value)
  }
});
