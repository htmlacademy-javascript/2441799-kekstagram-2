const COMMENTS_STEP = 5;

const bigPicture = document.querySelector ('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentShowCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

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

const onOutsideBigPictureClick = (evt) => {
  if (evt.target === bigPicture) {
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add ('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
  bigPicture.removeEventListener('click', onOutsideBigPictureClick);
}

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

  commentsCount.textContent = `${showComments} из ${currentComments.length} комментариев`;

  if (socialCommentShowCount) {
    socialCommentShowCount.textContent = `${showComments}`;
  }

  if (socialCommentTotalCount) {
    socialCommentTotalCount.textContent = `${currentComments.length}`;
  }

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

  socialComments.innerHTML = '';

  renderComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  bigPicture.addEventListener('click', onOutsideBigPictureClick);
};

export {openBigPicture};
