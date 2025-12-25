const imgPreview = document.querySelector ('.img-upload__preview img');
const effectSlider = document.querySelector ('.effect-level__slider');
const effectValue = document.querySelector ('.effect-level__value');
const effectsList = document.querySelectorAll ('.effects__radio');
const effectLevelElement = document.querySelector ('.img-upload__effect-level');

let currentEffect = 'original'; //по умолчанию эффект оригинал
effectLevelElement.classList.add('hidden');

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

//когда слайдер движется, меняется фильтр
effectSlider.noUiSlider.on('update', ([value]) => {
  effectValue.value = value; //запись текущего значения эффекта

  const params = EFFECTS[currentEffect]; //получаем параметры текущего эффекта

  if (currentEffect === 'original') {
    imgPreview.style.filter = '';
    return;
  }
  imgPreview.style.filter = `${params.filter}(${value}${params.unit})`; //применяем фильтр к изображению
});

//переключение эффектов
effectsList.forEach((radio) => {
  radio.addEventListener ('change', (evt) => {
    const value = evt.target.value;
    currentEffect = value === 'none' ? 'original' : value;

    //обновление radio input только через точное присвоение checked
    const selectedRadio = document.querySelector(`input[name="effect"][value="${value}"]`);
    if (selectedRadio) {
      selectedRadio.checked = true;
    }

    const params = EFFECTS[currentEffect];

    //скрываем слайдер, если выбран Оригинал
    if (currentEffect === 'original') {
      effectLevelElement.classList.add('hidden');
      imgPreview.style.filter = '';
      effectValue.value = '';
      return;
    }
    //для остальных эффектов
    effectLevelElement.classList.remove('hidden');
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

//функция сбороса эффекта
export function resetEffects () {
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
};
