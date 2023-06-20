const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureLoader = bigPicture.querySelector('.social__comments-loader');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentsShown = bigPicture.querySelector('.social__comment-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

let generateMoreComments;
let commentsShown = 0;

const generateComment = (element) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = `<img class="social__picture"
  src="${element.avatar}"
  alt="${element.name}" width="35" height="35">
  <p class="social__text">${element.message}</p>`;
  bigPictureComments.appendChild(comment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  commentsShown = 0;
  bigPictureComments.innerHTML = '';

  window.removeEventListener('keydown', closeBigPicture);
  body.classList.remove('modal-open');
  bigPictureLoader.removeEventListener('click', generateMoreComments);
  bigPictureClose.removeEventListener('click', closeBigPicture);
};

const showBigPicture = ({url, description, likes, comments}) => {
  const generateCommentCounter = () => {
    bigPictureCommentsShown.textContent = `${commentsShown > comments.length ?
      comments.length : commentsShown} из ${comments.length} комментариев`;
  };

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = url;
  bigPictureDescription.textContent = description;
  bigPictureLikesCount.textContent = likes;

  if (comments.length > 5 && bigPictureLoader.classList.contains('hidden')) {
    bigPictureLoader.classList.remove('hidden');
  }

  generateMoreComments = () => {
    const nextComments = comments.slice(commentsShown, commentsShown + 5);
    nextComments.map((comment) => generateComment(comment));

    commentsShown += 5;
    generateCommentCounter();

    if (commentsShown >= comments.length) {
      bigPictureLoader.classList.add('hidden');
    }
  };

  generateMoreComments();

  bigPictureLoader.addEventListener('click', generateMoreComments);
  bigPictureClose.addEventListener('click', closeBigPicture);
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPicture();
    }
  });
};

export {showBigPicture};
