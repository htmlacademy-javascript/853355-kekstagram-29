function isMatching(str, num) {
  return str.length === num ? console.log('true') : console.log('false');
}
isMatching('hello', 6);

function isPalindrome(str) {
  return str.toUpperCase() === str.toUpperCase().split('').reverse().join('') ? console.log('true') : console.log('false');
}
isPalindrome('tenet');

function numbersSeparator(str) {
  const numbersArray = str.match(/\d+/g);
  return numbersArray === null ? console.log('NaN') : console.log(numbersArray.join(''));
}

numbersSeparator('This1 is b3ers13');
