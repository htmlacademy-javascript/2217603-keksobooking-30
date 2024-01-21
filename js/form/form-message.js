import { isEscapeKey } from '../util.js';

// Ищем образец сообщений в разметке
const messageError = document.querySelector('#error')
  .content.querySelector('.error');
const messageSuccess = document.querySelector('#success')
  .content.querySelector('.success');

// Функция, скрывающая сообщение
const hideMessage = () => {
  const exitMessage = document.querySelector('.success') || document.querySelector('.error');
  exitMessage.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

// Скрытие сообщения при нажатии на кнопку закрытия
const onCloseButtonClick = () => {
  hideMessage();
};

// Скрытие сообщения при нажатии на Esc
function onMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

// Скрытие сообщения при нажатии на произвольную область экрана
function onBodyClick(evt) {
  if (evt.target.closest('.success') || (evt.target.closest('.error'))) {
    return;
  }
  hideMessage();
}

// Отрисовка сообщения
const showMessage = (message, buttonClass) => {
  document.body.append(message);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  if(buttonClass) {
    message.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
  }
};

const showMessageError = () => {
  showMessage(messageError, '.error__button');
};

const showMessageSuccess = () => {
  showMessage(messageSuccess);
};

export { showMessageError, showMessageSuccess };
