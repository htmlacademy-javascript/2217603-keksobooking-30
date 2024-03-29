// Исходные данные по соответствию типов жилья
const TYPE_MATCHING = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

// Поиск подходящей разметки
const advertTemplate = document.querySelector('#card').content.querySelector('.popup');

// Создание списка удобств с нужным набором удобств
const renderFeatures = (features, adWorkPiece) => {
  if (features) {
    const adFeaturesList = adWorkPiece.querySelector('.popup__features');
    const adFeaturesItems = adFeaturesList.querySelectorAll('.popup__feature');
    adFeaturesItems.forEach((adFeaturesItem) => {
      const isFeatures = features?.some((feature) => adFeaturesItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isFeatures) {
        adFeaturesItem.remove();
      }
    });
  } else {
    adWorkPiece.querySelector('.popup__features').remove();
  }
};

// Проверка на случай отсутствия описания
const isOfferDescription = (description, adWorkPiece) => {
  if (description) {
    adWorkPiece.querySelector('.popup__description').textContent = description;
  } else {
    adWorkPiece.querySelector('.popup__description').remove();
  }
};

// Создание элемента фото с нужным src
const renderPhotos = (photos, adWorkPiece) => {
  if (photos) {
    const adPhotosList = adWorkPiece.querySelector('.popup__photos');
    const adPhotosItem = adPhotosList.querySelector('.popup__photo');
    const adPhotoTemplate = adPhotosItem.cloneNode(true);
    adPhotosItem.remove();
    photos?.forEach((photo) => {
      const adPhotoClone = adPhotoTemplate.cloneNode(true);
      adPhotoClone.src = `${photo}`;
      adPhotosList.appendChild(adPhotoClone);
    });
  } else {
    adWorkPiece.querySelector('.popup__photos').remove();
  }
};

// Отрисовка объявления по тех заданию
const renderAdvert = (data) => {
  const { author, offer } = data;
  // Создаем клон шаблона для корректировки данных
  const adWorkPiece = advertTemplate.cloneNode(true);
  // Заполняем
  adWorkPiece.querySelector('.popup__title').textContent = `${offer.title}`;
  adWorkPiece.querySelector('.popup__text--address').textContent = `${offer.address}`;
  adWorkPiece.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adWorkPiece.querySelector('.popup__type').textContent = TYPE_MATCHING[offer.type];
  adWorkPiece.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adWorkPiece.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  renderFeatures(offer.features, adWorkPiece);
  isOfferDescription(offer.description, adWorkPiece);
  renderPhotos(offer.photos, adWorkPiece);
  adWorkPiece.querySelector('.popup__avatar').src = `${author.avatar}`;

  return adWorkPiece;
};

export { renderAdvert };
