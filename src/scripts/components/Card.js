export class Card {
  constructor({data, handleCardClick}, elementForm) {
    this._fotoName = data.name;
    this._imageURL = data.info;
    this._elementForm = elementForm;
    this._handleCardClick = handleCardClick
  }

  #newElement = this._getTemplate();

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
     this._handleCardClick(this._fotoName, this._imageURL);
    });
  }

  createCard = () => {
    this.#newElement.querySelector('.elements__text').textContent = this._fotoName;
    this.#newElement.querySelector('.elements__mask-group').src = this._imageURL;
    this.#newElement.querySelector('.elements__mask-group').alt = this._fotoName;
    this._setEventlisteners(this.#newElement);
    return this.#newElement;
  }
}