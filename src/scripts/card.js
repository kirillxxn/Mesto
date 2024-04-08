// @todo: Функция создания карточки
export function cardAndDelete(card, deleteCard, likeCard, openImage) {
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template') // Переменная с шаблоном из Template элемента
    const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__image').src = card.link; // Ссылка на изображение
    cardElement.querySelector('.card__image').alt = card.name; // Имя карточки
    cardElement.querySelector('.card__title').textContent = card.name; // Заголовок карточки
    cardElement.querySelector('.card__delete-button').addEventListener('click', function () { // Обработчик события дял удаления карточки
      deleteCard(cardElement);
    });
    /* Слушатель для кнопки лайка */
    cardLikeButton.addEventListener("click", function (evt) {
      likeCard(evt);
    });
    /* Слушатель открытия картинки */
    cardImage.addEventListener('click', function (evt) {
      openImage(evt, card);
    });
    return cardElement;
  };
  /* Функция лайка */
  export function likeCard(evt) {
    if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
    };
  };
  // @todo: Функция удаления карточки
  export function deleteCard(cardElement) {
    cardElement.remove();
  };