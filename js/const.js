const AvatarRange = {
  MIN: 1,
  MAX: 6
};

const LikesRange = {
  MIN: 15,
  MAX: 200
};

const CommentsRange = {
  MIN: 0,
  MAX: 30
};

const COMMENTS_STEP = 5;
const MAX_HASHTAGS_COUNT = 5;
const ERROR_DURATION = 5000;

const sliderSettings = {
  chrome: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    START: 0,
  },
  sepia: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    START: 0,
  },
  marvin: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    START: 0,
  },
  phobos: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    START: 0,
  },
  heat: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    START: 1,
  }
};

export {AvatarRange, LikesRange, CommentsRange, COMMENTS_STEP, MAX_HASHTAGS_COUNT, ERROR_DURATION, sliderSettings};
