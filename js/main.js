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

const DESCRIPTIONS = [
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

//Функция, создает объект comments
const createComments = () => {
  let id = 1;

  return () => {
    const comment = {};
    const idAvatar = getRandomInteger (1, 6);
    comment.id = id;
    comment.avatar = `img/avatar-${idAvatar()}.svg`;
    comment.message = `${getRandomArrayElement(MESSAGES)}`;
    comment.name = `${getRandomArrayElement(NAMES)}`;
    id++;
    return comment;
  };
};

//Получаем количество комментариев
const numComments = getRandomInteger(0, 30);
//Получаем колличество лайков
const numLikes = getRandomInteger(15, 200);

const getPhoto = () => {
  let id = 1;
  return () => {
    const photo = {};

    photo.id = id;
    photo.url = `photo/${id}.jpg`;
    photo.description = `${getRandomArrayElement(DESCRIPTIONS)}`;
    photo.likes = Math.floor(numLikes ());

    //Список комментариев
    photo.comments = Array.from({length: numComments()}, createComments());
    id++;
    return photo;
  };
};

const photoArray = Array.from({length: 25}, getPhoto());

console.log(photoArray);
