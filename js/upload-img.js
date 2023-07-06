import { ERROR_DURATION, MAX_HASHTAGS_COUNT } from './const.js';
import { initSlider } from './image-edit.js';
import { postData } from './data.js';
import { showErrorMessage } from './error-message.js';
import { showSuccessMessage } from './success-message.js';
import { initZoom } from './image-zoom.js';

const form = document.querySelector('.img-upload__form');
const imgInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(form);

pristine.addValidator(hashtagInput, () => {
  const hashtags = hashtagInput.value.split(' ');
  if (hashtags.length === 1 && hashtags[0] === '') {
    return true;
  }
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return false;
  }

  if (hashtags.length !== new Set(hashtags).size) {
    return false;
  }

  return hashtags.every((hashtag) => /^#[a-zA-Z0-9]*$/.test(hashtag));
});

const onCloseUploadOverlay = (onEscape) => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgPreview.removeAttribute('style');
  imgPreview.removeAttribute('class');
  form.reset();
  window.removeEventListener('keydown',onEscape);
};

const onEscapeOverlay = (evt) => {
  if (evt.key === 'Escape') {
    if (!(hashtagInput === document.activeElement || !descriptionInput === document.activeElement)) {
      onCloseUploadOverlay(onEscapeOverlay);
    }
  }
};

const showValidationError = () => {
  hashtagInput.classList.add('has-error');
  descriptionInput.classList.add('has-error');
  setTimeout(() => {
    hashtagInput.classList.remove('has-error');
    descriptionInput.classList.remove('has-error');
  }, ERROR_DURATION);
};

const onSuccess = (cb) => {
  onCloseUploadOverlay();
  showSuccessMessage(onEscapeOverlay);

  closeButton.removeEventListener('click', () => onCloseUploadOverlay(onEscapeOverlay));
  form.removeEventListener('submit', cb);
};

const onFail = () => {
  showErrorMessage(onEscapeOverlay);
  window.removeEventListener('keydown',onEscapeOverlay);
};

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (isValid) {
    postData(onSuccess, onFail, onFormSubmit, form);
  } else {
    showValidationError();
  }
};

const onOpenUploadOverlay = (evt) => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  initSlider();

  const reader = new FileReader();
  reader.addEventListener('load', (e) => {
    form.querySelector('.img-upload__preview img').src = e.target.result;
  });
  reader.readAsDataURL(evt.target.files[0]);

  initZoom();

  closeButton.addEventListener('click', () => onCloseUploadOverlay(onEscapeOverlay));
  window.addEventListener('keydown',onEscapeOverlay);
  form.addEventListener('submit', onFormSubmit);
};

const initUploadImg = () => {
  imgInput.addEventListener('change', onOpenUploadOverlay);
};

export {initUploadImg};
