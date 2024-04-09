import '../pages/index.css';
import {
  openPopup,
  closePopup
} from './modal.js';
import {
  initialCards
} from './cards.js';
import {
  createCard,
  likeCard,
  deleteCard
} from './card.js';
// Все комментарии добавил для себя, не обращайте внимания =)
// @todo: DOM узлы
const contentElement = document.querySelector('.content');
const placeList = contentElement.querySelector('.places__list')
const buttonEditProfile = document.querySelector('.profile__edit-button');
const editProfile = document.querySelector('.popup_type_edit');
const exitEditProfile = editProfile.querySelector('.popup__close');
const profileInfo = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const buttonAddImage = document.querySelector('.profile__add-button');
const newCard = document.querySelector('.popup_type_new-card');
const exitNewCard = newCard.querySelector('.popup__close');
const formPlace = document.forms["new-place"];
const placeInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const popupTypeImg = document.querySelector('.popup_type_image');
const popupImage = popupTypeImg.querySelector('.popup__image');
const popupCaption = popupTypeImg.querySelector('.popup__caption');
const exitTypeImg = popupTypeImg.querySelector('.popup__close');

/*   Обработчик  событий DOMContentLoaded, который добавляет класс popup_is-animated при построении DOM, т.е при загрузки страницы */
document.addEventListener("DOMContentLoaded", function () {
  editProfile.classList.add('popup_is-animated');
  newCard.classList.add('popup_is-animated');
  popupTypeImg.classList.add('popup_is-animated');
});

// @todo: Добавление карточeк на страницу
function addCard(card) { // Функция добавления карточек
  placeList.append(createCard(card, deleteCard, likeCard, openImage));
};
// @todo: Вывести карточки на страницу
initialCards.forEach(addCard);

/* Клик по кнопке редактировать профиль  */
buttonEditProfile.addEventListener('click', function () {
  openPopup(editProfile);
  nameInput.value = profileInfo.textContent;
  jobInput.value = profileDescription.textContent;
});

/* Функция обработчика заполнения формы профиля */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileInfo.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfile);
};
profileForm.addEventListener('submit', handleProfileFormSubmit);
/* Клик по крестику выхода из модального окна редактирования профиля */
exitEditProfile.addEventListener('click', function () {
  closePopup(editProfile);
});
/* Закрытие окна редактирования профиля при нажатии на оверлей */
editProfile.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(editProfile);
  };
});
/* Клик по кнопке добавления фото */
buttonAddImage.addEventListener('click', function () {
  openPopup(newCard);
});

/* Функция добавления новой карточки */
formPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const card = {
    link: urlInput.value,
    name: placeInput.value,
  };
  placeList.prepend(createCard(card, deleteCard, likeCard, openImage));
  formPlace.reset();
  closePopup(newCard);
});
/* Клик по крестику выхода из модального окна добавления карточки */
exitNewCard.addEventListener('click', function () {
  closePopup(newCard);
});

/* Закрытие окна добавление карточки при нажатии на оверлей */
newCard.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(newCard);
  };
});

/* Функция открытия карточки */
function openImage(evt, card) {
  if (!evt.target.classList.contains('card__delete-button')) {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    popupTypeImg.classList.add('popup_dark');
    openPopup(popupTypeImg);
  };
};

/* Клик по крестику выхода из окна просмотра картинки */
exitTypeImg.addEventListener('click', function () {
  closePopup(popupTypeImg);
});
/* Закрытие окна просмотра карточки при нажатии на оверлей */
popupTypeImg.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupTypeImg);
  };
});
/* Закрытие окна просмотра картинок при нажатии на ESC */
window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popupTypeImg);
  };
});