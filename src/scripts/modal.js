/* Функция открытия модального окна */
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", handleEscape);
};
/* Функция закрытия модального окна */
export function closePopup(overt) {
  overt.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", handleEscape);
};
/* Функция закрытия модального окна при нажатии на ESC*/
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}