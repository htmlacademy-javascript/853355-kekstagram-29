import {generatePosts} from'./data.js';
import { displayPosts } from './posts.js';
import './upload-img.js';

displayPosts(generatePosts(25));
