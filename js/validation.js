const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector ('.img-upload__form');
const textHashtags = imgUploadForm.querySelector ('.text__hashtags');
const textComment = imgUploadForm.querySelector ('.text__description');
const submitButton = imgUploadForm.querySelector('#upload-submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const getHashtags = (value) => value.trim().split(/\s+/).filter((tag) => tag.length > 0);

const validateHashtagFormat = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = getHashtags(value);
  return hashtags.every((tag) => HASHTAG_REGEX.test(tag));
};

const validateHashtagCount = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

const validateHashtagUnique = (value) => {
  const hashtags = getHashtags(value).map((tag) => tag.toLowerCase());
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

imgUploadForm.addEventListener('input', () => {
  const isFormValid = pristine.validate();
  submitButton.disabled = !isFormValid;
});

export const isValid = () => pristine.validate();

export const resetValidation = () => {
  pristine.reset();
  submitButton.disabled = false;
};

