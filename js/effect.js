import { EFFECTS } from './effects-constance.js';

const imgPreview = document.querySelector ('.img-upload__preview img');
const effectSlider = document.querySelector ('.effect-level__slider');
const effectValue = document.querySelector ('.effect-level__value');
const effectsList = document.querySelectorAll ('.effects__radio');
const effectLevelElement = document.querySelector ('.img-upload__effect-level');

let currentEffect = 'original';
effectLevelElement.classList.add('hidden');

noUiSlider.create(effectSlider, {
  start: 100,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  },
  step: 1,
  format: {
    to: function (value) {
      return parseFloat(value);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

effectSlider.noUiSlider.on('update', ([value]) => {
  effectValue.value = value;
  const params = EFFECTS[currentEffect];

  if (currentEffect === 'original') {
    imgPreview.style.filter = '';
    return;
  }
  imgPreview.style.filter = `${params.filter}(${value}${params.unit})`;
});

effectsList.forEach((radio) => {
  radio.addEventListener ('change', (evt) => {
    const value = evt.target.value;
    currentEffect = value === 'none' ? 'original' : value;

    const selectedRadio = document.querySelector(`input[name="effect"][value="${value}"]`);
    if (selectedRadio) {
      selectedRadio.checked = true;
    }

    const params = EFFECTS[currentEffect];

    if (currentEffect === 'original') {
      effectLevelElement.classList.add('hidden');
      imgPreview.style.filter = '';
      effectValue.value = '';
      return;
    }

    effectLevelElement.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions ({
      start: params.max,
      range: {
        'min': params.min,
        'max': params.max
      },
      step: params.step
    });

    effectSlider.noUiSlider.set(params.max);
    imgPreview.style.filter = `${params.filter}(${params.max}${params.unit})`;
    effectValue.value = params.max;
  });
});

export function resetEffects() {
  currentEffect = 'original';
  imgPreview.style.filter = '';
  effectLevelElement.classList.add('hidden');
  effectValue.value = '';
  const originalRadio = document.querySelector('#effect-none');

  if (originalRadio) {
    originalRadio.checked = true;
  } effectSlider.noUiSlider.updateOptions ({
    start: 100,
    range: {
      min: 0,
      max: 100
    },
    step: 1
  });

  effectSlider.noUiSlider.set(100);
}
