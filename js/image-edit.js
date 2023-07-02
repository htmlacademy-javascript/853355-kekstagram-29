const filters = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.effect-level__slider');
const sliderParentContainer = document.querySelector('.img-upload__effect-level');
const imgPreview = document.querySelector('.img-upload__preview img');

let currentSlider = null;

const sliderSettings = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 0,
    setFilter: (image, value) => {
      image.style.filter = `grayscale(${value})`;
    }
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 0,
    setFilter: (image, value) => {
      image.style.filter = `sepia(${value})`;
    }
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    start: 0,
    setFilter: (image, value) => {
      image.style.filter = `invert(${value}%)`;
    }
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    start: 0,
    setFilter: (image, value) => {
      image.style.filter = `blur(${value}px)`;
    }
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    start: 1,
    setFilter: (image, value) => {
      image.style.filter = `brightness(${value})`;
    }
  }
};

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
    sliderSettings[effect].setFilter(image, value);
  });
};

const createSlider = (effect) => {
  const {min, max, step, start} = sliderSettings[effect];
  createSliderManager(min, max, step, start);
};

const initSlider = () => {
  filters.addEventListener('change', (evt) => {
    if (evt.target.classList.contains('effects__radio')) {
      const effect = evt.target.value;
      imgPreview.removeAttribute('class');
      imgPreview.removeAttribute('style');
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
