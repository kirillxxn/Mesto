/* Конфиг */
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-11",
  headers: {
    authorization: "d7e4830c-bf89-4e86-98ef-a450dac1d9da",
    "Content-Type": "application/json",
  },
};
/* Функция для показа ошибок */
function errorResponse(res, message) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${message}: ${res.status}`);
}
/* Запрос данных пользователя */
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка при запросе данных пользователя: ${res.status}`
      );
    });
};

/* Запрос карточек с сервера */
export function getCardInfo() {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка при получении карточек: ${res.status}`
      );
    });
};
/* Редактирование профиля */
export function getEditUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка при редактровании данных пользователя: ${res.status}`
      );
    });
};
/* Добавление новых карточек */
export function getAddCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка при добавлении карточки: ${res.status}`);
    });
};

/* Обновление аватара пользователя */
export function updateAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    return errorResponse(res, "Ошибка при изменении аватара");
  });
};
/*   Поставить лайк */
export function addLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return errorResponse(res, "Ошибка при установке лайка");
  });
};
/*   Удаление карточки */
export function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return errorResponse(res, "Ошибка при удалении карточки");
  });
};
/* Удаление лайка */
export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return errorResponse(res, "Ошибка при удалении лайка");
  });
};