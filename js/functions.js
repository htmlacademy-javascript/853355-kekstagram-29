function isMatching(str, num) {
  return str.length === num;
}
isMatching('hello', 6);

function isPalindrome(str) {
  return str.toUpperCase() === str.toUpperCase().split('').reverse().join('');
}
isPalindrome('tenet');

function numbersSeparator(str) {
  const numbersArray = str.match(/\d+/g);
  return numbersArray === null ? 'NaN' : numbersArray.join('').replace(/^0+/, '');
}

numbersSeparator('This1 is b3ers13');
