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

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];
const getRandomWithinRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
