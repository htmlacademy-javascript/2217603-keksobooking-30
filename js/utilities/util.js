// Задержка отрисовки фильтров
const RERENDER_DELAY = 500;

const throttle = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId, lastCallTime;
  return (...rest) => {
    const elapsedTime = Date.now() - lastCallTime;
    const delay = Math.max(timeoutDelay - elapsedTime, 0);
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...rest);
      lastCallTime = Date.now();
    }, delay);
  };
};

// Определяет, является ли кнопка Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export { throttle, isEscapeKey };
