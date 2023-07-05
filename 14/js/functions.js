const isMatching = (str, num) => str.length === num;

isMatching('hello', 6);

const isPalindrome = (str) => str.toUpperCase() === str.toUpperCase().split('').reverse().join('');

isPalindrome('tenet');

const numbersSeparator = (str) => {
  const numbersArray = str.match(/\d+/g);
  return numbersArray === null ? 'NaN' : numbersArray.join('').replace(/^0+/, '');
};

numbersSeparator('This1 is b3ers13');

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
