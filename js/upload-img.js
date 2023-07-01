import { ERROR_DURATION, MAX_HASHTAGS_COUNT } from './const.js';
import { initSlider } from './image-edit.js';
import { postData } from './data.js';

const form = document.querySelector('.img-upload__form');
const imgInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = form.querySelector('.img-upload__cancel');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const pristine = new Pristine(form);

pristine.addValidator(hashtagInput, () => {
  const hashtags = hashtagInput.value.split(' ');
  if (hashtags.length === 1 && hashtags[0] === '') {
    return true;
  }
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return false;
  }
  return hashtags.every((hashtag) => /^#[a-zA-Z0-9]*$/.test(hashtag));
});

const onCloseUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
};

const onEscapeOverlay = (evt) => {
  if (evt.key === 'Escape') {
    if (!(hashtagInput === document.activeElement || !descriptionInput === document.activeElement)) {
      onCloseUploadOverlay();
      window.removeEventListener('keydown',onEscapeOverlay);
    }
  }
};

const removeSuccessMessage = (success) => {
  success.remove();
};

const onEscapeSuccessMessage = (evt, success) => {
  if (evt.key === 'Escape') {
    removeSuccessMessage(success);
  }
};

const showSuccessMessage = () => {
  const success = successMessage.cloneNode(true);
  const button = success.querySelector('.success__button');
  const escapeSuccessHandler = (evt) => onEscapeSuccessMessage(evt, success);

  window.removeEventListener('keydown',onEscapeOverlay);

  button.addEventListener('click', () => {
    removeSuccessMessage(success);
    window.removeEventListener('keydown', escapeSuccessHandler, {once: true});
  }, {once: true});
  window.addEventListener('keydown', escapeSuccessHandler, {once: true});
  document.body.append(success);
};

const removeErrorMessage = (error) => {
  error.remove();
  window.addEventListener('keydown',onEscapeOverlay);
};

const onEscapeErrorMessage = (evt, error) => {
  if (evt.key === 'Escape') {
    removeErrorMessage(error);
  }
};

const showErrorMessage = () => {
  const error = errorMessage.cloneNode(true);
  const button = error.querySelector('.error__button');
  const escapeErrorHandler = (evt) => onEscapeErrorMessage(evt, error);

  button.addEventListener('click', () => {
    removeErrorMessage(error);
    window.removeEventListener('keydown', escapeErrorHandler, {once: true});
  }, {once: true});
  window.addEventListener('keydown', escapeErrorHandler, {once: true});
  document.body.append(error);
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
  showSuccessMessage();

  closeButton.removeEventListener('click', onCloseUploadOverlay);
  window.removeEventListener('keydown',onEscapeOverlay);
  form.removeEventListener('submit', cb);
};

const onFail = () => {
  showErrorMessage();
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

  closeButton.addEventListener('click', onCloseUploadOverlay);
  window.addEventListener('keydown',onEscapeOverlay);
  form.addEventListener('submit', onFormSubmit);
};

const initUploadImg = () => {
  imgInput.addEventListener('change', (evt) => onOpenUploadOverlay(evt));
};

export {initUploadImg};
