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

const generateComments = (number) => {
  const comments = [];
  for (let i = 0; i < number; i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomWithinRange(1, 6)}.svg`,
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
      likes: getRandomWithinRange(15, 200),
      comments: generateComments(getRandomWithinRange(0, 30))
    });
  }
  return posts;
};

generatePosts(35);


/**
 * Переводим часы (часть HH из HH:MM) в число
 *
 * @param {string} time - часы формата "HH:MM".
 * @returns {number} возвращает часы как число.
 */
const adaptedHours = (time) => parseInt(time.split(':')[0], 10);

/**
 * Переводим минуты (часть MM из HH:MM) в число
 *
 * @param {string} time - часы формата "HH:MM"..
 * @returns {number} возвращает минуты как число.
 */
const adaptedMins = (time) =>parseInt(time.split(':')[1], 10) / 60;

/**
 * Проверяем попадает ли встреча в диапозон рабочего дня
 *
 * @param {string} start - Начало рабочего дня в формате"HH:MM".
 * @param {string} end - Конец рабочего дня в формате"HH:MM".
 * @param {string} meetingStart - Начало встречи в формате"HH:MM".
 * @param {number} duration - Длительность встречи в минутах.
 * @returns {boolean} Возвращает true если встреча попадает в диапозон рабочего дня, иначе false.
 */
const isWithinWorkday = (start, end, meetingStart, duration) => {
  const startTime = adaptedHours(start) + adaptedMins(start); // переводим начало рабочего дня в число
  const endTime = adaptedHours(end) + adaptedMins(end); // переводим конец рабочего дня в число
  const meetingStartHours = adaptedHours(meetingStart) + adaptedMins(meetingStart); // переводим начало встречи в число
  const meeingEndsAt = meetingStartHours + duration / 60; // конец встречи как число

  return meeingEndsAt <= endTime && meetingStartHours >= startTime; // сравниваем
};

isWithinWorkday('8:50', '17:30', '08:50', 90);
