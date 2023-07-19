import { COMMENTS_STEP } from './const.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureLoader = bigPicture.querySelector('.social__comments-loader');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentsShown = bigPicture.querySelector('.social__comment-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const bigPictureComment = document.getElementById('comment_item');
const body = document.querySelector('body');

let closeHandler = null;

const generateComment = (element) => {
  const comment = bigPictureComment.content.cloneNode(true);
  comment.querySelector('.social__picture').src = element.avatar;
  comment.querySelector('.social__picture').alt = element.name;
  comment.querySelector('.social__text').textContent = element.message;
  bigPictureComments.appendChild(comment);
};

const showMoreComments = (comments) => {
  let commentsShown = bigPictureComments.children.length;
  const nextComments = comments.slice(commentsShown, commentsShown + COMMENTS_STEP);
  nextComments.map((comment) => generateComment(comment));

  commentsShown += COMMENTS_STEP;
  bigPictureCommentsShown.textContent = `${commentsShown > comments.length ?
    comments.length : commentsShown} из ${comments.length} комментариев`;

  if (commentsShown >= comments.length) {
    bigPictureLoader.classList.add('hidden');
  }
};

const onCloseBigPicture = (onEscape, onLoadClick) => {
  bigPicture.classList.add('hidden');
  bigPictureImg.textContent = '';
  bigPictureComments.textContent = '';

  window.removeEventListener('keydown', onEscape);
  bigPictureClose.removeEventListener('click', closeHandler);
  bigPictureLoader.removeEventListener('click', onLoadClick);
  body.classList.remove('modal-open');
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeHandler();
  }
};

const showBigPicture = ({url, description, likes, comments}) => {
  const onLoadComments = () => showMoreComments(comments);
  closeHandler = () => onCloseBigPicture(onEscKeyDown, onLoadComments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = url;
  bigPictureDescription.textContent = description;
  bigPictureLikesCount.textContent = likes;

  if (comments.length > COMMENTS_STEP && bigPictureLoader.classList.contains('hidden')) {
    bigPictureLoader.classList.remove('hidden');
  }


  bigPictureLoader.addEventListener('click', onLoadComments);
  bigPictureClose.addEventListener('click', closeHandler);
  window.addEventListener('keydown', onEscKeyDown);

  showMoreComments(comments);
};

export {showBigPicture};
