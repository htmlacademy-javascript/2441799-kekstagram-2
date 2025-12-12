// Функция получения случайного числа
export const getRandomInteger = (a, b) => {
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
export const getRandomArrayElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1)(); // Вызываем сразу
  return elements[randomIndex];
};

//Функция вывода ошибок
export const showAlert = (message) => {
  const alert = document.createElement ('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '20px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = '#fd4d4b';
  alert.textContent = message;

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
};
