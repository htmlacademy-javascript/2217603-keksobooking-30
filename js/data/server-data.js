import { getServerData, sendDataServer } from './api.js';
import { renderStatusMessage } from '../utilities/status-message.js';
import { activateFilters, inactivateFilters } from '../utilities/set-activity.js';
import { createMarkers } from '../map/render-map.js';
import { resetAdForm } from '../form/form-handler.js';

// Текст кнопки отправки формы, для предотвращения многократных отправок
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

// Поиск разметки
const submitButton = document.querySelector('.ad-form__submit');

// Блокировка и разблокировка кнопки отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Получение данных и что происходит при этом
const getData = async () => {
  try {
    const adverts = await getServerData();
    createMarkers(adverts);
    activateFilters();
  } catch {
    renderStatusMessage('data-error');
    inactivateFilters();
  }
};

// Отправка данных и сопутствующие события
const sendData = async (formElement) => {
  try {
    blockSubmitButton();
    await sendDataServer(new FormData(formElement));
    resetAdForm();
    renderStatusMessage('success');
  } catch {
    renderStatusMessage('error');
  } finally {
    unblockSubmitButton();
  }
};

export { getData, sendData };
