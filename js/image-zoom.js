import { ScaleValue } from './const.js';

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  if (currentValue > ScaleValue.MIN) {
    scaleValue.value = `${currentValue - ScaleValue.STEP}%`;
    imgPreview.style.transform = `scale(${(currentValue - ScaleValue.STEP) / ScaleValue.MAX})`;
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  if (currentValue < ScaleValue.MAX) {
    scaleValue.value = `${currentValue + ScaleValue.STEP}%`;
    imgPreview.style.transform = `scale(${(currentValue + ScaleValue.STEP) / ScaleValue.MAX})`;
  }
};

const initZoom = () => {
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
  scaleValue.value = `${ScaleValue.DEFAULT}%`;
  imgPreview.style.transform = 'scale(1)';
};

export { initZoom };
