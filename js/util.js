const DELAY = 5000;
const alertTemplate = document.querySelector ('#data-error').content.querySelector('.data-error');

export const showAlert = () => {
  const alert = alertTemplate.cloneNode(true);

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, DELAY);
};
