const successMessage = document.querySelector('#success').content.querySelector('.success');

const removeSuccessMessage = (success) => {
  success.remove();
};

const onEscapeSuccessMessage = (evt, success) => {
  if (evt.key === 'Escape') {
    removeSuccessMessage(success);
  }
};

const showSuccessMessage = (onEscapeOverlay) => {
  const success = successMessage.cloneNode(true);
  const button = success.querySelector('.success__button');
  const escapeSuccessHandler = (evt) => onEscapeSuccessMessage(evt, success);

  window.removeEventListener('keydown',onEscapeOverlay);

  button.addEventListener('click', () => {
    removeSuccessMessage(success);
    window.removeEventListener('keydown', escapeSuccessHandler);
  }, {once: true});
  window.addEventListener('keydown', escapeSuccessHandler, {once: true});
  document.body.append(success);
};

export { showSuccessMessage };
