import { getData } from'./data.js';
import { initUploadImg } from './upload-img.js';
import { initFilters } from './posts-filter.js';
import { onConnectionFail } from './utils.js';

getData(initFilters, onConnectionFail);
initUploadImg();
