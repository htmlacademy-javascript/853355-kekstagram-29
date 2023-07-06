import { MAX_SCALE_VALUE, MIN_SCALE_VALUE, STEP_SCALE_VALUE, DEFAULT_SCALE_VALUE } from './const.js';

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  if (currentValue > MIN_SCALE_VALUE) {
    scaleValue.value = `${currentValue - STEP_SCALE_VALUE}%`;
    imgPreview.style.transform = `scale(${(currentValue - STEP_SCALE_VALUE) / MAX_SCALE_VALUE})`;
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  if (currentValue < MAX_SCALE_VALUE) {
    scaleValue.value = `${currentValue + STEP_SCALE_VALUE}%`;
    imgPreview.style.transform = `scale(${(currentValue + STEP_SCALE_VALUE) / MAX_SCALE_VALUE})`;
  }
};

const initZoom = () => {
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
  scaleValue.value = `${DEFAULT_SCALE_VALUE}%`;
  imgPreview.style.transform = 'scale(1)';
};

export { initZoom };
