// Количество миллисекунд показа сообщения об ошибке
const DATA_ERROR_SHOW_TIME = 5000;

// Шаблон сообщения об ошибке загрузки объявлений с сервера
const dataErrorTemplate = document.querySelector('#data-error')
  .content.querySelector('.data-error');

// Показывает ошибку загрузки
const showDataError = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  document.body.append(dataError);
  setTimeout(() => {
    dataError.remove();
  }, DATA_ERROR_SHOW_TIME);
};

// Определяет, является ли кнопка Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, showDataError };
