import {getRandomArrayElement, getRandomWithinRange} from './utils.js';

const commentTexts = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const commentAuthors = [
  'Masha', 'Petya', 'Vasya', 'Amir', 'Sasha', 'Misha', 'Abbos', 'Jasur', 'Vova', 'Sergey', 'Vladimir'
];

const AVATAR_RANGE = {
  min: 1,
  max: 6
};

const LIKES_RANGE = {
  min: 15,
  max: 200
};

const COMMENTS_RANGE = {
  min: 0,
  max: 30
};

const generateComments = (number) => {
  const comments = [];
  for (let i = 0; i < number; i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomWithinRange(AVATAR_RANGE.min, AVATAR_RANGE.max)}.svg`,
      message: getRandomArrayElement(commentTexts),
      name: getRandomArrayElement(commentAuthors)
    });
  }
  return comments;
};

const generatePosts = (number) => {
  const posts = [];
  for (let i = 0; i < number; i++) {
    posts.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `nice photo number ${i}`,
      likes: getRandomWithinRange(LIKES_RANGE.min, LIKES_RANGE.max),
      comments: generateComments(getRandomWithinRange(COMMENTS_RANGE.min, COMMENTS_RANGE.max))
    });
  }
  return posts;
};


export {generatePosts};
