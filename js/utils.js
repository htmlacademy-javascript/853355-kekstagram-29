const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];
const getRandomWithinRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElements = (elements, count) => [...elements].sort(() => 0.5 - Math.random()).slice(0, count);

const onConnectionFail = (text) => {
  const error = document.querySelector('#connection-error').content.querySelector('.connection-error').cloneNode(true);
  const errorText = error.querySelector('.connection-error--text');
  errorText.textContent = text;
  document.body.append(error);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomArrayElement, getRandomWithinRange, getRandomArrayElements, onConnectionFail, debounce };
