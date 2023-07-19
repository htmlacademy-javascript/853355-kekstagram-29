import { MAX_HASHTAGS_COUNT, MAX_HASHTAG_LENGTH, MAX_DESCRIPTION_LENGTH } from './const.js';
import { initSlider, handleFilterChange } from './image-edit.js';
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
const submitButton = form.querySelector('.img-upload__submit');
const hashtagMessage = form.querySelector('.img-upload__text--error');
const descriptionMessage = form.querySelector('.img-upload__description--error');
const filters = document.querySelector('.img-upload__effects');

const validationRegEx = /^#[a-zA-Zа-яё0-9]*$/i;

let onSubmit = null;

const pristine = new Pristine(form);

const showValidationMessage = (message) => {
  hashtagInput.classList.add('pristine-error');
  descriptionInput.classList.add('pristine-error');
  hashtagMessage.classList.remove('visually-hidden');
  hashtagMessage.textContent = message;
  submitButton.disabled = true;
};

const showValidationNotification = (message) => {
  descriptionMessage.classList.remove('visually-hidden');
  descriptionMessage.textContent = message;
};

const removeValidationMessage = () => {
  hashtagInput.classList.remove('pristine-error');
  descriptionInput.classList.remove('pristine-error');
  hashtagMessage.classList.add('visually-hidden');
  submitButton.disabled = false;
};

const removeValidationNotification = () => {
  descriptionMessage.classList.add('visually-hidden');
};

pristine.addValidator(hashtagInput, () => {
  const hashtags = hashtagInput.value.split(/\s+/);
  const hashtagsInLowerCase = hashtags.map((hashtag) => hashtag.toLowerCase());
  const filteredHashtags = hashtagsInLowerCase.filter((hashtag) => hashtag !== '');

  removeValidationMessage();

  if (hashtagInput.value.length === 0) {
    return true;
  }

  if (!filteredHashtags.every((hashtag) => hashtag.length !== 1 && hashtag !== '#')) {
    showValidationMessage('Cannot use only hashtag');
    return false;
  }

  if (filteredHashtags.some((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH)) {
    showValidationMessage('Hashtag cannot be more than 20 characters');
    return false;
  }

  if (filteredHashtags.length > MAX_HASHTAGS_COUNT) {
    showValidationMessage('Too many hashtags. Maximum is 5');
    return false;
  }

  if (filteredHashtags.length !== new Set(filteredHashtags).size) {
    showValidationMessage('Hashtags must be unique');
    return false;
  }

  const areHashtagsValid = () => filteredHashtags.every((hashtag) => validationRegEx.test(hashtag));

  if (!areHashtagsValid()) {
    showValidationMessage('Hashtags must start with a # and can contain only letters and numbers');
    return false;
  }

  return true;
});

pristine.addValidator(descriptionInput, () => {
  const description = descriptionInput.value;

  removeValidationNotification();
  removeValidationMessage();

  if (description.length === MAX_DESCRIPTION_LENGTH) {
    showValidationNotification('This is maximum allowed length for description');
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    showValidationMessage('The description is too long');
    return false;
  }

  return true;
});

const closeUploadOverlay = (onEscape) => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgPreview.removeAttribute('style');
  imgPreview.removeAttribute('class');
  form.reset();

  if (onSubmit) {
    form.removeEventListener('submit', onSubmit);
  }

  window.removeEventListener('keydown',onEscape);
  filters.removeEventListener('change', handleFilterChange);
};

const onEscapeOverlay = (evt) => {
  if (evt.key === 'Escape') {
    if (!(hashtagInput === document.activeElement || descriptionInput === document.activeElement)) {
      closeUploadOverlay(onEscapeOverlay);
    }
  }
};

const onCloseUploadOverlay = () => closeUploadOverlay(onEscapeOverlay);

const onSuccess = (cb) => {
  closeUploadOverlay(onEscapeOverlay);
  showSuccessMessage(onEscapeOverlay);

  submitButton.disabled = false;
  closeButton.removeEventListener('click', onCloseUploadOverlay);
  form.removeEventListener('submit', cb);
};

const onFail = () => {
  showErrorMessage(onEscapeOverlay);
  window.removeEventListener('keydown',onEscapeOverlay);
  submitButton.disabled = false;
};

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (isValid) {
    postData(onSuccess, onFail, onFormSubmit, form);
    submitButton.disabled = true;
    removeValidationNotification();
  } else {
    showValidationMessage('Form is not valid. Please check the fields');
  }
};

const onOpenUploadOverlay = (evt) => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  onSubmit = onFormSubmit;

  initSlider();

  const reader = new FileReader();
  reader.addEventListener('load', (e) => {
    form.querySelector('.img-upload__preview img').src = e.target.result;
  });
  reader.readAsDataURL(evt.target.files[0]);

  initZoom();

  closeButton.addEventListener('click', onCloseUploadOverlay);
  window.addEventListener('keydown',onEscapeOverlay);
  form.addEventListener('submit', onFormSubmit);
};

const initUploadImg = () => {
  imgInput.addEventListener('change', onOpenUploadOverlay);
};

export {initUploadImg};
