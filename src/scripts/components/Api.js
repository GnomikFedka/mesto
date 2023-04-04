export class Api {
    constructor({apiGetUserInfo, apiGetCards, apiSetUser, apiSetAvatar, apiAddCard, apiAddLike, apiRemoveLike, apiGetLikes,
       apiRenderError, apiChangeButonTextOfFormActivityFieldName, apiChangeButonTextOfFormPopupAvatar,
       apiChangeButonTextOfFormPopupNewElement}) {
        this._apiGetUserInfo = apiGetUserInfo;
        this._apiGetCards = apiGetCards;
        this._apiSetUser = apiSetUser;
        this._apiSetAvatar = apiSetAvatar;
        this._apiAddCard = apiAddCard;
        this._apiAddLike = apiAddLike;
        this._apiRemoveLike = apiRemoveLike;
        this._apiGetLikes = apiGetLikes;
        this._apiRenderError = apiRenderError;
        this._apiChangeButonTextOfFormActivityFieldName = apiChangeButonTextOfFormActivityFieldName;
        this._apiChangeButonTextOfFormPopupAvatar = apiChangeButonTextOfFormPopupAvatar;
        this._apiChangeButonTextOfFormPopupNewElement = apiChangeButonTextOfFormPopupNewElement;
    }

    apiGetUserJson() {
      fetch('https://mesto.nomoreparties.co/v1/cohort-63/users/me ', {
        headers: {
          authorization: '9747cacb-cd33-472a-8f54-1926cc52a8f6'
        }
      })
      .then(res => {
        if (res.ok) {
            return res.json();
        }
        else return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        this._apiGetUserInfo(data);
      })
      .catch((err) => {
        this._apiRenderError(`Ошибка: ${err}`)
      })
    }

    apiGetCardsJson() {
      fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
        headers: {
          authorization: '9747cacb-cd33-472a-8f54-1926cc52a8f6'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        this._apiGetCards(data);
      })
      .catch((err) => {
        this._apiRenderError(`Ошибка: ${err}`)
      })
    }

    apiSetUserJson(user) {
      fetch('https://mesto.nomoreparties.co/v1/cohort-63/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '9747cacb-cd33-472a-8f54-1926cc52a8f6',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        this._apiSetUser(data);
      })
      .catch((err) => {
        this._apiRenderError(`Ошибка: ${err}`)
      })
      .finally(() => {
        this._apiChangeButonTextOfFormActivityFieldName();
      }) 
    }

    apiSetAvatarJson(avatar) {
      fetch('https://mesto.nomoreparties.co/v1/cohort-63/users/me/avatar', {
        method: 'PATCH',
        headers: {
          authorization: '9747cacb-cd33-472a-8f54-1926cc52a8f6',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(avatar)
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        this._apiSetAvatar(data);
      })
      .catch((err) => {
        this._apiRenderError(`Ошибка: ${err}`)
      })
      .finally(() => {
        this._apiChangeButonTextOfFormPopupAvatar();
      }) 
    }

    apiAddCardJson(card) {
        fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
          method: 'POST',
          headers: {
            authorization: '9747cacb-cd33-472a-8f54-1926cc52a8f6',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(card)
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          else return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
          this._apiAddCard(data);
        })
        .catch((err) => {
          this._apiRenderError(`Ошибка: ${err}`)
        })
        .finally(() => {
          this._apiChangeButonTextOfFormPopupNewElement();
        })   
    }

    apiDeleteCardJson(card) {
      fetch(`https://mesto.nomoreparties.co/v1/cohort-63/cards/${card._id}`, {
        method: 'DELETE',
        headers: {
          authorization: '9747cacb-cd33-472a-8f54-1926cc52a8f6',
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        this._apiRenderError(`Ошибка: ${err}`)
      })
    }

    apiAddLikeJson(cardData, card, likeOwner) {
      fetch(`https://mesto.nomoreparties.co/v1/cohort-63/cards/${cardData._id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: '9747cacb-cd33-472a-8f54-1926cc52a8f6',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(likeOwner)
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        this._apiAddLike(data, card);
      })
      .catch((err) => {
        this._apiRenderError(`Ошибка: ${err}`)
      })
    }

    apiRemoveLikeJson(cardData, card) {
      fetch(`https://mesto.nomoreparties.co/v1/cohort-63/cards/${cardData._id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: '9747cacb-cd33-472a-8f54-1926cc52a8f6',
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        this._apiRemoveLike(data, card);
      })
      .catch((err) => {
        this._apiRenderError(`Ошибка: ${err}`)
      })
    }
}