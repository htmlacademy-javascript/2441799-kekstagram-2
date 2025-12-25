import { isValid, resetValidation } from './validation.js';
import { resetEffects } from './effect.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textComment = imgUploadForm.querySelector('.text__description');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const submitButton = imgUploadForm.querySelector('#upload-submit');

function resetEditor() {
  imgUploadForm.reset();
  resetScale();
  resetEffects();
  resetValidation();
}

const onOutsideEditorClick = (evt) => {
  if (evt.target === imgUploadOverlay) {
    closeModalEditor();
  }
};

const onModalEditorCancelClick = () => {
  closeModalEditor();
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape' && !document.querySelector('.error')) {
    closeModalEditor();
  }
};

function closeModalEditor() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetEditor();
  document.removeEventListener('keydown', onEscKeydown);
  imgUploadCancel.removeEventListener('click', onModalEditorCancelClick);
  imgUploadOverlay.removeEventListener('click', onOutsideEditorClick);
  imgUploadInput.value = '';
}

imgUploadForm.addEventListener('reset', () => {
  resetEditor();
});

imgUploadInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  imgUploadCancel.addEventListener('click', onModalEditorCancelClick);
  imgUploadOverlay.addEventListener('click', onOutsideEditorClick);
});

textHashtags.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.stopPropagation();
  }
});

textComment.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.stopPropagation();
  }
});

function showMessageLoading(template) {
  const message = template.cloneNode(true);
  body.appendChild(message);

  const onEscKeydownMessage = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  const onClickOutsideMessage = (evt) => {
    if (evt.target.classList.contains('error') || evt.target.classList.contains('success')) {
      closeMessage();
    }
  };

  const button = message.querySelector('.success__button') || message.querySelector('.error__button');

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onEscKeydownMessage);
    document.removeEventListener('click', onClickOutsideMessage);
  }

  document.addEventListener('keydown', onEscKeydownMessage);
  document.addEventListener('click', onClickOutsideMessage);

  if (button) {
    button.addEventListener('click', closeMessage);
  }
}

const blockSubmitButton = (isDisabled = true) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Публикую...' : 'Опубликовать';
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!isValid()) {
    return;
  }

  const imgUploadFormData = new FormData(imgUploadForm);
  blockSubmitButton();
  sendData(imgUploadFormData)
    .then(() => {
      closeModalEditor();
      showMessageLoading(successMessage);
    })
    .finally(() => {
      blockSubmitButton(false);
    })
    .catch(() => {
      showMessageLoading(errorMessage);
    });
});
