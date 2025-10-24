
const imgUploadForm = document.querySelector ('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector ('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector ('.img-upload__overlay');
const body = document.querySelector ('body');
const imgUploadCancel = imgUploadForm.querySelector ('.img-upload__cancel');

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
