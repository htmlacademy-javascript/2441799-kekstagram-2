// Массив сообщений
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Массив имен
const NAMES = [
  'Иван',
  'Петр',
  'Мария',
  'Вадим',
  'Елена',
  'Владимир',
  'Татьяна',
  'Виктор',
  'Анастасия',
  'Ольга'
];

const DESCRIPTION = [
  'Природа',
  'Животные',
  'Города',
  'Люди',
  'Семья',
  'Работа',
  'Друзья',
  'Машина',
];

// Функция получения случайного числа
const getRandomInteger = (a, b) => {
const lower = Math.ceil(Math.min(a, b));
const upper = Math.floor(Math.max(a, b));
let previousResult = -1;
return () => {
    const result = Math.random() * (upper - lower + 1) + lower;
    //Исключение повторения значений предыдущего вызова
    if (previousResult !== result) {
      previousResult = result;
      return result
    } return result === upper ? lower : result + 1;
}
};

//Функция поиска случайного элемента в массиве
cons getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)]

// Функция, создает объект, который описывает фото
const photo = () => {
  return {
      id: getRandomInteger(1, 25),
      url: photos/{{id}}.jpg,
      description: getRandomArrayElement(DESCRIPTION),
      likes: getRandomInteger(1, 25),
      comments: getRandomArrayElement(MESSAGES),
      avatar: img/avatar-{{getRandomInteger(1, 6)}},
      message: '',
      name: '',
  };
};

// Описание фото, Массив
const getDescriptionPhoto = Array.from ({length: 25}, photo);

console.log(getDescriptionPhoto);
