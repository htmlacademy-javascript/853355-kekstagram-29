import { sliderSettings } from './const.js';

const filters = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.effect-level__slider');
const sliderParentContainer = document.querySelector('.img-upload__effect-level');
const imgPreview = document.querySelector('.img-upload__preview img');

let currentSlider = null;

const createSliderManager = (min, max, step, start) => {
  if (currentSlider) {
    currentSlider.destroy();
  }

  noUiSlider.create(sliderContainer, {
    start: start,
    range: {
      min: min,
      max: max,
    },
    step: step,
  });

  currentSlider = sliderContainer.noUiSlider;
};

const createSliderListener = (effect, image) => {
  sliderContainer.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    switch (effect) {
      case 'chrome':
        image.style.filter = `grayscale(${value})`;
        break;
      case 'sepia':
        image.style.filter = `${effect}(${value})`;
        break;
      case 'marvin':
        image.style.filter = `invert(${value}%)`;
        break;
      case 'phobos':
        image.style.filter = `blur(${value}px)`;
        break;
      case 'heat':
        image.style.filter = `brightness(${value})`;
        break;
    }
  });
};

const createSlider = (effect) => {
  switch (effect) {
    case 'chrome':
      createSliderManager(
        sliderSettings.chrome.MIN,
        sliderSettings.chrome.MAX,
        sliderSettings.chrome.STEP,
        sliderSettings.chrome.START,
      );
      break;
    case 'sepia':
      createSliderManager(
        sliderSettings.sepia.MIN,
        sliderSettings.sepia.MAX,
        sliderSettings.sepia.STEP,
        sliderSettings.sepia.START,
      );
      break;
    case 'marvin':
      createSliderManager(
        sliderSettings.marvin.MIN,
        sliderSettings.marvin.MAX,
        sliderSettings.marvin.STEP,
        sliderSettings.marvin.START,
      );
      break;
    case 'phobos':
      createSliderManager(
        sliderSettings.phobos.MIN,
        sliderSettings.phobos.MAX,
        sliderSettings.phobos.STEP,
        sliderSettings.phobos.START,
      );
      break;
    case 'heat':
      createSliderManager(
        sliderSettings.heat.MIN,
        sliderSettings.heat.MAX,
        sliderSettings.heat.STEP,
        sliderSettings.heat.START,
      );
      break;
  }
};

const initSlider = () => {
  filters.addEventListener('change', (evt) => {
    if (evt.target.classList.contains('effects__radio')) {
      const effect = evt.target.value;
      imgPreview.classList = '';
      sliderParentContainer.classList.add('hidden');
      sliderContainer.classList.add('hidden');

      if (effect !== 'none') {
        sliderParentContainer.classList.remove('hidden');
        sliderContainer.classList.remove('hidden');
        imgPreview.classList.add(`effects__preview--${effect}`);
        createSlider(effect);
        createSliderListener(effect, imgPreview);
      }
    }
  });
};

export {initSlider};
