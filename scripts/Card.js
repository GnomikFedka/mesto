import {openPopup, popupMesto, popupText, popupFoto, elementsArray, elementForm} from './index.js';
export class Card {
    constructor(fotoName, imageURL) {
        this._fotoName = fotoName;
        this._imageURL = imageURL;
    }

    _createCard = () => {
      const newElement = elementForm.cloneNode(true);
      const foto = newElement.querySelector('.elements__mask-group');
      const like = newElement.querySelector('.elements__button-like');
      const deleteButton = newElement.querySelector('.elements__delete-button');
      foto.src = this._imageURL;
      foto.alt = this._fotoName;
      newElement.querySelector('.elements__text').textContent = this._fotoName;
      like.addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__button-like_active');
      });
      deleteButton.addEventListener('click', function () {
        newElement.remove();
      });
      foto.addEventListener('click', function () {
        popupFoto.src = foto.src;
        popupFoto.alt = foto.alt;
        popupText.textContent = foto.alt;
        openPopup(popupMesto);
      });
      return newElement;
    }

    renderCard = () => {
        elementsArray.prepend(this._createCard());
    } 
}