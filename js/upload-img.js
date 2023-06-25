const form = document.querySelector('.img-upload__form');
const imgInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = form.querySelector('.img-upload__cancel');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const pristine = new Pristine(form);

pristine.addValidator(hashtagInput, () => {
  const hashtags = hashtagInput.value.split(' ');
  if (hashtags.length === 1 && hashtags[0] === '') {
    return true;
  }
  if (hashtags.length > 5) {
    return false;
  }
  return hashtags.every((hashtag) => /^#[a-zA-Z0-9]*$/.test(hashtag));
});

const showSuccessMessage = () => {
  const success = successMessage.cloneNode(true);
  const button = success.querySelector('.success__button');
  button.addEventListener('click', () => success.remove());
  document.body.append(success);
};

const showError = () => {
  hashtagInput.classList.add('has-error');
  descriptionInput.classList.add('has-error');
  setTimeout(() => {
    hashtagInput.classList.remove('has-error');
    descriptionInput.classList.remove('has-error');
  }, 5000);
};

const onCloseUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
};

const onEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (!(hashtagInput === document.activeElement || !descriptionInput === document.activeElement)) {
      onCloseUploadOverlay();
    }
  }
};

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (isValid) {
    onCloseUploadOverlay();
    showSuccessMessage();

    form.removeEventListener('submit', onFormSubmit);
    window.removeEventListener('keydown',onEscapeKeydown);

  } else {
    showError();
  }
};

const onOpenUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseUploadOverlay);
  window.addEventListener('keydown',onEscapeKeydown);
  form.addEventListener('submit', onFormSubmit);
};

imgInput.addEventListener('input', onOpenUploadOverlay);
