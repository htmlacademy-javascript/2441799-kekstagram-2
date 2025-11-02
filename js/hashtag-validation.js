const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i; //регулярное выражени - начинается с #, буквы и цифры, не длиннее 20 символов включая #, не может быть только одна #
const MAX_HASHTAG = 5; //максимум 5 хештегов
const MAX_HASHTAG_LENGTH = 20;

const pristine = new Pristine (imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});


const validateHashtags = (value) => {
  const hashtags = value.trim().split(/\s=/).filter(Boolean); //убрать лишние пробели и разделяем пробелами

}
