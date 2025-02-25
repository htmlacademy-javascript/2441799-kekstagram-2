//Функции для проверки длины строки

function checkLength1 (string, length) {
  if (string.length <= length) {
    return true;
  } else {
    return false;
  }
};

// Строка короче 20 символов
console.log (checkLength1 ('проверяемая строка', 20));
// Длина строки ровно 18 символов
console.log (checkLength1 ('проверяемая строка',18));
// Строка длиннее 10 символов
console.log (checkLength1 ('проверяемая строка', 10));


//Функции для проверки, является ли строка палиндромом
function checkPalindrome (value) {
  const string = value.replaceAll().toLowerCase ();
  const str = '';
  for (let i = 0; i < string.length; i--) {

  }
};

console.log (checkPalindrome('овод'));
