const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  if (currentValue > 25) {
    scaleValue.value = `${currentValue - 25}%`;
    imgPreview.style.transform = `scale(${(currentValue - 25) / 100})`;
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  if (currentValue < 100) {
    scaleValue.value = `${currentValue + 25}%`;
    imgPreview.style.transform = `scale(${(currentValue + 25) / 100})`;
  }
};

const initZoom = () => {
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
  scaleValue.value = '100%';
  imgPreview.style.transform = 'scale(1)';
};

export { initZoom };
