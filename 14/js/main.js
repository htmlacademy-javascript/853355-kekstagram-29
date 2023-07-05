import { getData } from'./data.js';
// import { displayPosts } from './posts.js';
import { initUploadImg } from './upload-img.js';
import { initFilters } from './posts-filter.js';

// getData(displayPosts);
getData(initFilters);
initUploadImg();
