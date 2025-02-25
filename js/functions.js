//Функции для проверки длины строки

function checkLength1 (string, length) {
  if (string.length <= length) {
    return true;
  } else {
    return false;
  }
}

// Строка короче 20 символов
console.log (checkLength1 ('проверяемая строка', 20));
// Длина строки ровно 18 символов
console.log (checkLength1 ('проверяемая строка',18));
// Строка длиннее 10 символов
console.log (checkLength1 ('проверяемая строка', 10));


//Функции для проверки, является ли строка палиндромом
function checkPalindrome (value) {
  const string = value.replaceAll('').toLowerCase();
  let str = '';
  for (let i = string.length - 1; i >= 0; i--) {
    str += string[i];
    if (str === string) {
      return 'Строка является палиндромом';
    } else {
      return 'Строка не является палиндромом';
    }
  }
}

console.log (checkPalindrome('довод'));

/*function checkPalindrome1 (value) {
  const string = value.replaceAll('').toLowerCase();
  if (string === value.split('').reverse().join('')) {
    return 'Строка является палиндромом';
  } else {
    return 'Строка не является палиндромом';
  }
}

console.log (checkPalindrome1('анна'));*/
