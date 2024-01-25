// Задержка отрисовки фильтров
const RERENDER_DELAY = 500;

// Устранение дребезга
const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Определяет, является ли кнопка Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export { debounce, isEscapeKey };
