const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];
const getRandomWithinRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElements = (elements, count) => [...elements].sort(() => 0.5 - Math.random()).slice(0, count);

export { getRandomArrayElement, getRandomWithinRange, getRandomArrayElements };
