import { getRandomArrayElements } from './utils.js';
import { displayPosts } from './posts.js';
import { POSTS_COUNT } from './const.js';

const postsFilter = document.querySelector('.img-filters');
postsFilter.classList.remove('img-filters--inactive');

let postsCopy;

const defaultPosts = () => postsCopy;
const randomPosts = () => getRandomArrayElements(postsCopy, POSTS_COUNT);
const discussedPosts = () => postsCopy.sort((a, b) => b.comments.length - a.comments.length);
const clearPosts = () => {
  const posts = document.querySelectorAll('.picture');
  posts.forEach((post) => post.remove());
};

const initFilters = (posts) => {
  postsCopy = posts.slice();
  const filters = document.querySelector('.img-filters');
  displayPosts(defaultPosts());

  filters.addEventListener('click', (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    const activeFilter = document.querySelector('.img-filters__button--active');
    activeFilter.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    switch (evt.target.id) {
      case 'filter-default':
        clearPosts();
        displayPosts(defaultPosts());
        break;
      case 'filter-random':
        clearPosts();
        displayPosts(randomPosts());
        break;
      case 'filter-discussed':
        clearPosts();
        displayPosts(discussedPosts());
        break;
    }
  });
};


export { initFilters };
