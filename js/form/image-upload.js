// Изначальные данные
const photoOptions = {
  alt: 'Фото вашего жилья',
  width: 70,
  height: 70,
  defaultSrc: 'img/muffin-grey.svg',
};

// Поиск нужной разметки
const adForm = document.querySelector('.ad-form');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const avatarUpload = adForm.querySelector('.ad-form-header__upload input');
const photoPreviewContainer = adForm.querySelector('.ad-form__photo');
const photoUpload = adForm.querySelector('.ad-form__upload input');

// Создание миниатюры в DOM
const createThumbnailPhoto = () => {
  photoPreviewContainer.innerHTML = '';
  const photoPreview = document.createElement('img');
  photoPreview.alt = photoOptions.alt;
  photoPreview.width = photoOptions.width;
  photoPreview.height = photoOptions.height;
  photoPreviewContainer.appendChild(photoPreview);
  return photoPreview;
};

// Отрисовка миниатюры фото
const renderThumbnail = (file, preview) => {
  if (file?.type.startsWith('image')) {
    preview.src = URL.createObjectURL(file);
  }
};

// Обнуление загруженных изображений
const resetImages = () => {
  photoPreviewContainer.innerHTML = '';
  avatarPreview.src = photoOptions.defaultSrc;
  photoUpload.value = '';
  avatarUpload.value = '';
};

export { createThumbnailPhoto, renderThumbnail, resetImages };
