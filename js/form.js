import {validateHashtagFormat, validateHashtagCount, validateHashtagUnique, MAX_HASHTAG_COUNT} from './hashtag-validation.js';
import {validateCommentLength, MAX_COMMENT_LENGTH} from './comment-validation.js';

const imgUploadForm = document.querySelector ('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector ('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector ('.img-upload__overlay');
const body = document.querySelector ('body');
const imgUploadCancel = imgUploadForm.querySelector ('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector ('.text__hashtags');
const textComment = imgUploadForm.querySelector ('.text__description');

const pristine = new Pristine (imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const onModalEditorCancelClick = () => {
  closeModalEditor();
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeModalEditor();
  }
};

function closeModalEditor () {
  imgUploadOverlay.classList.add ('hidden');
  body.classList.remove ('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  imgUploadCancel.removeEventListener ('click', onModalEditorCancelClick);
  imgUploadInput.value = '';
}

const openModalEditor = () => {
  imgUploadInput.addEventListener ('change', () => {
    imgUploadOverlay.classList.remove ('hidden');
    body.classList.add ('modal-open');
    document.addEventListener('keydown', onEscKeydown);
    imgUploadCancel.addEventListener ('click', onModalEditorCancelClick);
  });
};

openModalEditor ();

pristine.addValidator (textHashtags, validateHashtagFormat, 'Введён невалидный хэштег: хештэг должен начинаться с #, состоять из букв (латиница и кириллица) и цифр, длинна от 1 до 19 символов, не содержит пробелов или спецсимволов');
pristine.addValidator (textHashtags, validateHashtagCount, `Превышено количество хэштегов, можно указать не более ${MAX_HASHTAG_COUNT}`);
pristine.addValidator (textHashtags, validateHashtagUnique, 'Хештеги не должны повторяться');
pristine.addValidator (textComment, validateCommentLength, `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    console.log ('Форма прошла проверку');
    imgUploadForm.submit();
  } else {
    console.log ('Форма не прошла проверку');
  }
});

// если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
textHashtags.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.stopPropagation();
  }
});

//если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
textComment.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.stopPropagation();
  }
});
