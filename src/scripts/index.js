import '../pages/index.css';
import {
  openPopup,
  closePopup
} from './modal.js';

import {
  createCard,
  likeCard,
  deleteCard,
} from './card.js';
import {
  getUserInfo,
  getCardInfo,
  getEditUser,
  getAddCard,
  updateAvatar
}
from './api.js';
import {
  enableValidation,
  clearValidation
} from "./validation.js";
// Все комментарии добавил для себя, не обращайте внимания =)
// @todo: DOM узлы
const contentElement = document.querySelector('.content');
const placeList = contentElement.querySelector('.places__list')
/* Профиль */
const buttonEditProfile = document.querySelector('.profile__edit-button');
const editProfile = document.querySelector('.popup_type_edit');
const exitEditProfile = editProfile.querySelector('.popup__close');
const profileInfo = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const buttonSaveEditProfile = editProfile.querySelector('.popup__button');
/* Карточки */
const buttonAddImage = document.querySelector('.profile__add-button');
const newCard = document.querySelector('.popup_type_new-card');
const exitNewCard = newCard.querySelector('.popup__close');
const formPlace = document.forms['new-place'];
const popupTypeImg = document.querySelector('.popup_type_image');
const popupImage = popupTypeImg.querySelector('.popup__image');
const popupCaption = popupTypeImg.querySelector('.popup__caption');
const exitTypeImg = popupTypeImg.querySelector('.popup__close');
const buttonSaveAddCard = newCard.querySelector('.popup__button');
/* Аватар */
const profileImage = document.querySelector('.profile__image');
const editAvatar = document.querySelector('.popup_type_avatar');
const editAvatarForm = document.forms['avatar-profile'];
const avatarInput = document.querySelector('.popup__input_type_avatar');
const buttonEditAvatar = editAvatar.querySelector('.popup__button');
const imageSection = document.querySelector('.profile__image-section');
const exitEditAvatar = editAvatar.querySelector('.popup__close');

/*   Обработчик  событий DOMContentLoaded, который добавляет класс popup_is-animated при построении DOM, т.е при загрузки страницы */
document.addEventListener('DOMContentLoaded', function () {
  editProfile.classList.add('popup_is-animated');
  newCard.classList.add('popup_is-animated');
  popupTypeImg.classList.add('popup_is-animated');
  editAvatar.classList.add('popup_is-animated');
});
/* Функция загрузки */
function loadingButtonSave(loading, button) {
  button.textContent = loading ? "Сохранение..." : "Сохранить";
};
/* Профиль */
/* Клик по кнопке редактировать профиль  */
buttonEditProfile.addEventListener('click', function () {
  clearValidation(profileForm, validationConfig)
  openPopup(editProfile);
  nameInput.value = profileInfo.textContent;
  jobInput.value = profileDescription.textContent;
});
/* Функция обработчика заполнения формы профиля */
function handleSubmitFormProfile(evt) {
  evt.preventDefault();
  loadingButtonSave(true, buttonSaveEditProfile);
  getEditUser(evt.target.name.value, evt.target.description.value)
    .then((user) => {
      profileInfo.textContent = user.name;
      profileDescription.textContent = user.about;
      closePopup(editProfile);
      loadingButtonSave(false, buttonSaveEditProfile);
    })
    .catch((err) => {
      console.log('Ошибка при редактировании профиля:' + ' ' + err);
    })
};
/* Слушатель для кнопки сохранить в модальном окне редактирования профиля */
profileForm.addEventListener('submit', handleSubmitFormProfile);
/* Клик по крестику выхода из модального окна редактирования профиля */
exitEditProfile.addEventListener('click', function () {
  closePopup(editProfile);
});
/* Закрытие окна редактирования профиля при нажатии на оверлей */
editProfile.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(editProfile);
  };
});
/* Аватар */
/* Клик по иконке редактирования аватара */
buttonEditAvatar.addEventListener('click', function () {
  openPopup(editAvatar);
});
/*  Клик по крестику для выхода из окна редактирования аватара */
exitEditAvatar.addEventListener('click', function () {
  closePopup(editAvatar);
});
/* Закрытие окна редактирования аватара при нажатии на оверлей */
editAvatar.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(editAvatar);
  };
});
/* Функция изменения аватара */
function handleSubmitFormAvatar(evt) {
  evt.preventDefault();
  loadingButtonSave(true, buttonEditAvatar);
  updateAvatar(evt.target.link.value)
    .then((photo) => {
      profileImage.src = photo.avatar;
      closePopup(editAvatar);
      loadingSave(false, buttonEditAvatar);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.log('Ошибка при обновлении аватара:' + err);
    })
};
/* Слушатель для кнопки сохранить в модальном окне редактирования аватара */
editAvatarForm.addEventListener('submit', handleSubmitFormAvatar);
/* Слушатель для открытия модального окна редактирования аватара и очистки полей */
imageSection.addEventListener('click', function () {
  avatarInput.value = '';
  clearValidation(editAvatarForm, validationConfig);
  openPopup(editAvatar);
});
/* Картинки */
/* Клик по кнопке добавления фото */
buttonAddImage.addEventListener('click', function () {
  formPlace.reset();
  openPopup(newCard);
  clearValidation(newCard, validationConfig);
});

/* Функция добавления новой карточки */
formPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  loadingButtonSave(true, buttonSaveAddCard);
  getAddCard(evt.target.place.value, evt.target.link.value)
    .then((card) => {
      placeList.prepend(createCard(card, deleteCard, likeCard, openImage));
      loadingButtonSave(false, buttonSaveAddCard);
    })
    .catch((err) => {
      console.log('Ошибка при добавлении карточки' + ' ' + err);
    });
  formPlace.reset();
  closePopup(newCard);

});
/* Клик по крестику выхода из модального окна добавления карточки */
exitNewCard.addEventListener('click', function () {
  closePopup(newCard);
});

/* Закрытие окна добавление карточки при нажатии на оверлей */
newCard.addEventListener('click', (evt) => {
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
/* Конфиг валидации */
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCardInfo()])
  .then(([user, card]) => {
    profileInfo.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.src = user.avatar;
    card.forEach((card) => {
      placeList.append(
        createCard(card, user._id, deleteCard, likeCard, openImage)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });