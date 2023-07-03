const errorMessage = document.querySelector('#error').content.querySelector('.error');

const removeErrorMessage = (error, onEscapeOverlay) => {
  error.remove();
  window.addEventListener('keydown',onEscapeOverlay);
};

const onEscapeErrorMessage = (evt, error) => {
  if (evt.key === 'Escape') {
    removeErrorMessage(error);
  }
};

const showErrorMessage = (onEscapeOverlay) => {
  const error = errorMessage.cloneNode(true);
  const button = error.querySelector('.error__button');
  const escapeErrorHandler = (evt) => onEscapeErrorMessage(evt, error);

  button.addEventListener('click', () => {
    removeErrorMessage(error, onEscapeOverlay);
    window.removeEventListener('keydown', escapeErrorHandler);
  }, {once: true});
  window.addEventListener('keydown', escapeErrorHandler, {once: true});
  document.body.append(error);
};

export { showErrorMessage };
