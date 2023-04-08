export class Api {
    constructor(headers) {
        this._headers = headers;
    }

    _getResponseData(res) {
      if (res.ok) {
          return res.json();
      }
      else return Promise.reject(`Ошибка: ${res.status}`);
    }

    apiGetUserJson() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-63/users/me', {
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    apiGetCardsJson() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    apiSetUserJson(user) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-63/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(user)
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    apiSetAvatarJson(avatar) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-63/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(avatar)
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    apiAddCardJson(card) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(card)
        })
        .then(res => {
          return this._getResponseData(res);
        })  
    }

    apiDeleteCardJson(card, cardData) {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-63/cards/${cardData._id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    apiAddLikeJson(card, userLikeData) {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-63/cards/${card._cardData._id}/likes`, {
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify(userLikeData)
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    apiRemoveLikeJson(card) {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-63/cards/${card._cardData._id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }
}