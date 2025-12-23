const bigPicture = document.querySelector ('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const COMMENTS_STEP = 5;
let currentComments = [];
let showComments = 0;

const onBigPictureCancelClick = () => {
  closeBigPicture();
};
const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

const onClickOutsideBigPicture = (evt) => {
  if (evt.target === bigPicture) {
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add ('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
  bigPicture.removeEventListener('click', onClickOutsideBigPicture);
};

//Подгрузка комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = currentComments.slice(showComments, showComments + COMMENTS_STEP);

  nextComments.forEach((comment) => {
    const commentElement = socialCommentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);
  showComments += nextComments.length;

  // Обновление счётчика комментариев
  commentsCount.textContent = `${showComments} из ${currentComments.length} комментариев`;

  //отражаем общее количество комментариев в отдельном span
  if (socialCommentTotalCount) {
    socialCommentTotalCount.textContent = `${currentComments.length}`;
  }

  // Скрытие кнопки, если все комментарии показаны
  if (showComments >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const openBigPicture = (currentPhoto) => {
  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  commentsCaption.textContent = currentPhoto.description;

  currentComments = currentPhoto.comments;
  showComments = 0;

  // Очистка предыдущих комментариев
  socialComments.innerHTML = '';

  renderComments(); //показываем первые 5 комментариев

  // Показ модального окна
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  bigPicture.addEventListener('click', onClickOutsideBigPicture);
};

export {openBigPicture};
