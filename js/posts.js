import {showBigPicture} from './big-picture.js';

const displayPosts = (posts) => {
  const postsContainer = document.querySelector('.pictures');
  const postTemplate = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();

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

  postsContainer.addEventListener('click', (evt) => {
    if (evt.target.tagName !== 'IMG') {
      return;
    }
    const postById = posts.find((post) => post.id === Number(evt.target.dataset.id));
    showBigPicture(postById);
  });
};

export {displayPosts};
