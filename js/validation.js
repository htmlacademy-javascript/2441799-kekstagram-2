const imgUploadForm = document.querySelector ('.img-upload__form');
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i; //регулярное выражени - начинается с #, буквы и цифры, не длиннее 20 символов включая #, не может быть только одна #
const MAX_HASHTAG_COUNT = 5; //максимум 5 хештегов
const MAX_COMMENT_LENGTH = 140;
const textHashtags = imgUploadForm.querySelector ('.text__hashtags');
const textComment = imgUploadForm.querySelector ('.text__description');
const submitButton = imgUploadForm.querySelector('#upload-submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

//функция, возвращает массив хештэгов, убирает пробелы в начале и в конце строки, разбиваем строку по одному или несколькими пробелами, убираем пустые элементы
const hashtagsArray = (value) => {
  return value.trim().split(/\s+/).filter((tag) => tag.length > 0);
};

//проверка формата хештэга
const validateHashtagFormat = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = hashtagsArray(value); //получаем список хештегов
  return hashtags.every((tag) => HASHTAG_REGEX.test(tag)); //проверяем каждый хештег на соответствие регулярного выражения
};

//проверка количества хештегов, возвращает true если кол-во хештнгов меньше или равно MAX_HASHTAG_COUNT
const validateHashtagCount = (value) => {
  const hashtags = hashtagsArray(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

//проверка на уникальность
const validateHashtagUnique = (value) => {
  const hashtags = hashtagsArray(value).map((tag) => tag.toLowerCase());
  const hashtagsUnique = new Set(hashtags);
  return hashtags.length === hashtagsUnique.size;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator (
  textHashtags,
  validateHashtagFormat,
  'Введён невалидный хэштег: хештэг должен начинаться с #, состоять из букв (латиница и кириллица) и цифр, длинна от 1 до 19 символов, не содержит пробелов или спецсимволов'
);

pristine.addValidator (
  textHashtags,
  validateHashtagCount,
  `Превышено количество хэштегов, можно указать не более ${MAX_HASHTAG_COUNT}`
);

pristine.addValidator (
  textHashtags,
  validateHashtagUnique,
  'Хештеги не должны повторяться'
);

pristine.addValidator (
  textComment,
  validateCommentLength,
  `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`
);

// блокировка кнопки при ошибках валидации
imgUploadForm.addEventListener('input', () => {
  const isFormValid = pristine.validate();
  submitButton.disabled = !isFormValid;
});

// экспорт функций
export const isValid = () => pristine.validate();

export const resetValidation = () => {
  pristine.reset();
  submitButton.disabled = false; // сброс блокировки кнопки
};

