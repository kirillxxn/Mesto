import {
  addLikeCard,
  deleteLike,
  removeCard
} from "./api.js";
const cardTemplate = document.querySelector('#card-template') // Переменная с шаблоном из Template элемента
// @todo: Функция создания карточки
export function createCard(card, userId, deleteCard, likeCard, openImage) {
  // @todo: Темплейт карточки
  const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeScore = cardElement.querySelector('.card__like-scores');
  const cardButtonDelete = cardElement.querySelector(".card__delete-button");
  const cardId = card._id;
  cardImage.src = card.link; // Ссылка на изображение
  cardImage.alt = card.name; // Имя карточки 
  cardLikeScore.textContent = card.likes.length;
  cardElement.querySelector('.card__title').textContent = card.name; // Заголовок карточки
  /* Слушатель открытия картинки */
  cardImage.addEventListener('click', function (evt) {
    openImage(evt, card);
  });
  /* Слушатель для кнопки лайка */
  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton, cardLikeScore, cardId);
  });

  const meLikeAdd = card.likes.some((like) => like._id === userId);
  if (meLikeAdd) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  if (card.owner._id !== userId) {
    cardButtonDelete.remove();
  } else {
    cardButtonDelete.addEventListener("click", () => {
      deleteCard(cardId, cardElement);
    });
  }
  return cardElement;
};
/* Функция лайка */
export function likeCard(cardLikeButton, cardLikeScore, cardId) {
  const apiLike = cardLikeButton.classList.contains(
      "card__like-button_is-active"
    ) ?
    deleteLike :
    addLikeCard;
  apiLike(cardId)
    .then((data) => {
      cardLikeScore.textContent = data.likes.length;
      cardLikeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log("Ошибка при нажатии лайка:" + '' + err);
    });
};
// @todo: Функция удаления карточки
export function deleteCard(cardId, cardElement) {
  removeCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки:" + '' + err);
    });
};