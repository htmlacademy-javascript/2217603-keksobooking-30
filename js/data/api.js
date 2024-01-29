// Изначальные данные
const BASE_URL = 'https://30.javascript.htmlacademy.pro/keksobooking';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу.',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

// Функция, обеспечивающая связь с сервером в обе стороны
const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

// Функция получения данных с сервера
const getServerData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

// Функция отправки данных на сервер
const sendDataServer = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getServerData, sendDataServer };
