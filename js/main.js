import {generatePosts} from'./data.js';
import { displayPosts } from './posts.js';
import {initUploadImg} from './upload-img.js';

displayPosts(generatePosts(25));
initUploadImg();
