// Функция получения случайного числа
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  let previousResult = -1;

  return () => {
    let result;
    do {
      result = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    } while (result === previousResult); // Исключаем повторение
    previousResult = result; // Запоминаем предыдущее значение
    return result;
  };
};

//Функция поиска случайного элемента в массиве
const getRandomArrayElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1)(); // Вызываем сразу
  return elements[randomIndex];
};

export {getRandomInteger, getRandomArrayElement};
