const DELAY = 5000;
const DEBOUNCE_DELAY = 500;
const alertTemplate = document.querySelector ('#data-error').content.querySelector('.data-error');

export const showAlert = () => {
  const alert = alertTemplate.cloneNode(true);

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, DELAY);
};

//Функция debounce для устранения дребезга
export const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
