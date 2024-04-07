/* Функция открытия модального окна */
export function openedPopup(popup) {
  popup.classList.add('popup_is-opened');
};
/* Функция закрытия модального окна */
export function closePopup(overt) {
  overt.classList.remove('popup_is-opened');
}