// Отрисовка всплывающих сообщений
const renderStatusMessage = (type) => {
  const template = document.querySelector(`#${type}`);
  const status = template.content.querySelector(`.${type}`).cloneNode(true);

  const onDocumentKeydown = (event) => {
    if (event.key.startsWith('Esc')) {
      status.click();
    }
  };
  const onStatusClick = () => {
    status.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  document.body.append(status);
  status.addEventListener('click', onStatusClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { renderStatusMessage };
