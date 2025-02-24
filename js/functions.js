//Функции для проверки длины строки
const string = 'проверяемая строка';
const len = string.length;

function checkLength1 (length) {
  if (len <= length) {
    return (true);
  } else {
    return (false);
  }
};

// Строка короче 20 символов
console.log (checkLength1 (20));
// Длина строки ровно 18 символов
console.log (checkLength1 (18));
// Строка длиннее 10 символов
console.log (checkLength1 (10));



//Функции для проверки, является ли строка палиндромом
