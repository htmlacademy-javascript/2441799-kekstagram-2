import {isValid, resetValidation} from './validation.js';
import { resetEffects } from './effect.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';

const imgUploadForm = document.querySelector ('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector ('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector ('.img-upload__overlay');
const body = document.querySelector ('body');
const imgUploadCancel = imgUploadForm.querySelector ('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector ('.text__hashtags');
const textComment = imgUploadForm.querySelector ('.text__description');
const successMessage = document.querySelector ('#success').content.querySelector('.success');
const errorMessage = document.querySelector ('#data-error').content.querySelector('.data-error');

function resetEditor() {
  imgUploadForm.reset();
  resetScale();
  resetEffects();
  resetValidation();
};

const onClickOutsideEditor = (evt) => {
  if (evt.target === imgUploadOverlay) {
    closeModalEditor ();
  }
};

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
  resetEditor();
  document.removeEventListener('keydown', onEscKeydown);
  imgUploadCancel.removeEventListener ('click', onModalEditorCancelClick);
  imgUploadOverlay.removeEventListener('click', onClickOutsideEditor);
  imgUploadInput.value = '';
}

//обработчик для кнопки сбоса
imgUploadForm.addEventListener ('reset', () => {
  resetEditor();
});

const openModalEditor = () => {
  imgUploadInput.addEventListener ('change', () => {
    imgUploadOverlay.classList.remove ('hidden');
    body.classList.add ('modal-open');
    document.addEventListener('keydown', onEscKeydown);
    imgUploadCancel.addEventListener ('click', onModalEditorCancelClick);
    imgUploadOverlay.addEventListener('click', onClickOutsideEditor);
  });
};

openModalEditor ();

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

//функция для сообщения об ошибках
function showMessageLoading (template) {
  const message = template.cloneNode(true); //клонирование шаблона сообщения
  body.appendChild(message); //добавить на страницу беред </body>

  const onEscKeydownMessage = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage ();
    }
  };

  const onClickOutsideMessage = (evt) => {
    if (!message.contains(evt.target)) {
      closeMessage ();
    }
  };

  const button = message.querySelector('.success__button') || message.querySelector('.error__button');
  const closeMessage = () => {
    message.remove ();
    document.removeEventListener('keydown', onEscKeydownMessage);
    document.removeEventListener('click', onClickOutsideMessage);
  };

  document.addEventListener('keydown', onEscKeydownMessage);
  document.addEventListener('click', onClickOutsideMessage);

  if (button) {
    button.addEventListener('click', closeMessage);
  }
}

//функция отправки формы
imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!isValid()) {
    return;
  }

  const imgUploadFormData = new FormData(imgUploadForm);

  sendData(imgUploadFormData)
   .then(() => {
    closeModalEditor();
    showMessageLoading(successMessage);
   })
   .catch(() => {
    showMessageLoading(errorMessage);
   });
});
