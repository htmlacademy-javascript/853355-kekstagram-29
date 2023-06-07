const isMatching = (str, num) => str.length === num;

isMatching('hello', 6);

const isPalindrome = (str) => str.toUpperCase() === str.toUpperCase().split('').reverse().join('');

isPalindrome('tenet');

const numbersSeparator = (str) => {
  const numbersArray = str.match(/\d+/g);
  return numbersArray === null ? 'NaN' : numbersArray.join('').replace(/^0+/, '');
};

numbersSeparator('This1 is b3ers13');
