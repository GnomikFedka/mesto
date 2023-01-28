export class Card {
  constructor(fotoName, imageURL, elementForm) {
    this._fotoName = fotoName;
    this._imageURL = imageURL;
    this._elementForm = elementForm;
  }

  _getTemplate = () => {
    const card = this._elementForm.cloneNode(true);
    return card;
  }

  _openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc);
  }

  _clickRemoveEsc = (evt) => {
    if (evt.target.classList.contains('popup')) {
      document.removeEventListener('keydown', this._closeByEsc);
    }
  }

  _closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      openedPopup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._closeByEsc);
    }
  }

  _likeCard = (evt) => {
    evt.target.classList.toggle('elements__button-like_active');
  }

  _setEventlisteners = (newElement) => {
    const like = newElement.querySelector('.elements__button-like');
    like.addEventListener('click', this._likeCard);
    const deleteButton = newElement.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', () => {
      newElement.remove();
    });
    const foto = newElement.querySelector('.elements__mask-group');
    foto.src = this._imageURL;
    foto.alt = this._fotoName;
    const popupMesto = document.querySelector('.popup_foto-mesto');
    const popupText = popupMesto.querySelector('.popup__text');
    const popupFoto = popupMesto.querySelector('.popup__foto');
    foto.addEventListener('click', () => {
      popupFoto.src = foto.src;
      popupFoto.alt = foto.alt;
      popupText.textContent = foto.alt;
      this._openPopup(popupMesto);
    });
    popupMesto.addEventListener('click', this._clickRemoveEsc);
  }

  createCard = () => {
    const newElement = this._getTemplate();
    newElement.querySelector('.elements__text').textContent = this._fotoName;
    this._setEventlisteners(newElement);
    return newElement;
  }
}