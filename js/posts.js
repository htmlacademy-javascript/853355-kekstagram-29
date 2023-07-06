import {showBigPicture} from './big-picture.js';

let postsArray = [];
const postsContainer = document.querySelector('.pictures');

const displayPosts = (posts) => {
  const postTemplate = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();
  postsArray = posts;

  posts.forEach((post) => {
    const postElement = postTemplate.cloneNode(true);
    const postImage = postElement.querySelector('.picture__img');
    postImage.src = post.url;
    postImage.alt = post.description;
    postImage.dataset.id = post.id;
    postElement.querySelector('.picture__likes').textContent = post.likes;
    postElement.querySelector('.picture__comments').textContent = post.comments.length;
    fragment.appendChild(postElement);
  });

  postsContainer.appendChild(fragment);
};

const postToDisplay = (evt) => {
  if (evt.target.tagName !== 'IMG') {
    return;
  }
  const postById = postsArray.find((post) => post.id === Number(evt.target.dataset.id));
  showBigPicture(postById);
};

postsContainer.addEventListener('click', postToDisplay);

export {displayPosts};
