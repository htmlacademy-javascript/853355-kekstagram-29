import { getRandomArrayElements, debounce } from './utils.js';
import { displayPosts } from './posts.js';
import { POSTS_COUNT } from './const.js';

const filters = document.querySelector('.img-filters');

const clearPosts = () => {
  const posts = document.querySelectorAll('.picture');
  posts.forEach((post) => post.remove());
};

const initFilters = (posts) => {
  filters.classList.remove('img-filters--inactive');

  const defaultPosts = () => posts.slice();
  const randomPosts = () => getRandomArrayElements(posts, POSTS_COUNT);
  const discussedPosts = () => posts.slice().sort((a, b) => b.comments.length - a.comments.length);

  displayPosts(defaultPosts());

  filters.addEventListener('click', debounce((evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    const activeFilter = document.querySelector('.img-filters__button--active');
    activeFilter.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    const filterFunctions = {
      'filter-default': defaultPosts,
      'filter-random': randomPosts,
      'filter-discussed': discussedPosts
    };

    const filterFunction = filterFunctions[evt.target.id];
    if (filterFunction) {
      clearPosts();
      displayPosts(filterFunction());
    }
  }));
};


export { initFilters };
