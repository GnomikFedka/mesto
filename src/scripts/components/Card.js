export class Card {
  constructor({data, handleCardClick}, elementForm) {
    this._fotoName = data.name;
    this._imageURL = data.info;
    this._handleCardClick = handleCardClick
    this._elementForm = elementForm;
    this._newElement = this._getTemplate();
  }

  _getTemplate = () => {
    return this._elementForm.cloneNode(true);
  }

  _likeCard = (evt) => {
    evt.target.classList.toggle('elements__button-like_active');
  }

  _setEventlisteners = () => {
    this._newElement.querySelector('.elements__button-like').addEventListener('click', this._likeCard);
    this._newElement.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._newElement.remove();
    });
    this._newElement.querySelector('.elements__mask-group').addEventListener('click', () => {
     this._handleCardClick(this._fotoName, this._imageURL);
    });
  }

  createCard = () => {
    this._newElement.querySelector('.elements__text').textContent = this._fotoName;
    this._newElement.querySelector('.elements__mask-group').src = this._imageURL;
    this._newElement.querySelector('.elements__mask-group').alt = this._fotoName;
    this._setEventlisteners();
    return this._newElement;
  }
}