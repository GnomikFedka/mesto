import { handleCardClick } from './index.js';
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

  _likeCard = (evt) => {
    evt.target.classList.toggle('elements__button-like_active');
  }

  _setEventlisteners = (newElement) => {
    newElement.querySelector('.elements__button-like').addEventListener('click', this._likeCard);
    newElement.querySelector('.elements__delete-button').addEventListener('click', () => {
      newElement.remove();
    });
    newElement.querySelector('.elements__mask-group').addEventListener('click', () => {
     handleCardClick(this._fotoName, this._imageURL);
    });
  }

  createCard = () => {
    const newElement = this._getTemplate();
    newElement.querySelector('.elements__text').textContent = this._fotoName;
    newElement.querySelector('.elements__mask-group').src = this._imageURL;
    newElement.querySelector('.elements__mask-group').alt = this._fotoName;
    this._setEventlisteners(newElement);
    return newElement;
  }
}