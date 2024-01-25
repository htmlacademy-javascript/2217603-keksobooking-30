import { isEscapeKey } from './util.js';

// Количество миллисекунд показа сообщения об ошибке
const DATA_ERROR_SHOW_TIME = 5000;

// Отрисовка всплывающих сообщений
const renderStatusMessage = (type) => {
  const template = document.querySelector(`#${type}`);
  const status = template.content.querySelector(`.${type}`).cloneNode(true);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      status.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };
  const onStatusClick = () => {
    status.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  if (type === 'data-error') {
    setTimeout(() => {
      status.remove();
    }, DATA_ERROR_SHOW_TIME);
  }

  document.body.append(status);
  status.addEventListener('click', onStatusClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { renderStatusMessage };
