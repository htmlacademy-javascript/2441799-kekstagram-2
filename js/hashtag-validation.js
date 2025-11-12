const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i; //регулярное выражени - начинается с #, буквы и цифры, не длиннее 20 символов включая #, не может быть только одна #
const MAX_HASHTAG_COUNT = 5; //максимум 5 хештегов

//функция, возвращает массив хештэгов, убирает пробелы в начале и в конце строки, разбиваем строку по одному или несколькими пробелами, убираем пустые элементы
const hashtagsArray = (value) => {
  return value.trim().split(/\s+/).filter((tag) => tag.length > 0);
};

//проверка формата хештэга
const validateHashtagFormat = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = hashtagsArray(value); //получаем список хештегов
  return hashtags.every((tag) => HASHTAG_REGEX.test(tag)); //проверяем каждый хештег на соответствие регулярного выражения
};

//проверка кол-ва хештегов, возвращает true если кол-во хештнгов меньше или равно MAX_HASHTAG_COUNT
const validateHashtagCount = (value) => {
  const hashtags = hashtagsArray(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

//проверка на уникальность
const validateHashtagUnique = (value) => {
  const hashtags = hashtagsArray(value).map((tag) => tag.toLowerCase());
  const hashtagsUnique = new Set(hashtags);
  return hashtags.length === hashtagsUnique.size;
};

export {validateHashtagFormat};
export {validateHashtagCount};
export {validateHashtagUnique};
export {MAX_HASHTAG_COUNT};

