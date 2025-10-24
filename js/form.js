
const imgUploadForm = document.querySelector ('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector ('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector ('.img-upload__overlay');
const body = document.querySelector ('body');
const imgUploadCancel = imgUploadForm.querySelector ('.img-upload__cancel');

const onModalEditorCancelClick = () => {
  closeModalEditor();
};

function closeModalEditor () {
  imgUploadCancel.removeEventListener ('click', onModalEditorCancelClick);
}

const openModalEditor = () => {
  imgUploadInput.addEventListener ('change', () => {
    imgUploadOverlay.classList.remove ('hidden');
    body.classList.add ('modal-open');
    imgUploadCancel.addEventListener ('click', onModalEditorCancelClick);
  });
};
