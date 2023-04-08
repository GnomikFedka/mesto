import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor({ deleteClick }, popupSelector) {
        super(popupSelector);
        this._deleteClick = deleteClick;
        this._saveButton = this._popup.querySelector('.popup__button-save');
        this._deleteButton = this._popup.querySelector('.popup__button-delete');
        this._card = Object;
        this._cardData = Object;
    }

    setElementAndData(card, cardData) {
      this._card = card;
      this._cardData = cardData;
    }

    changeButtonText(isLoading, buttonText) {
      if (isLoading) {
        this._saveButton.textContent = 'Сохранение...';
      } 
      else {
        this._saveButton.textContent = buttonText;
      }
    }

    close() {
      super.close();
    }
    
    setEventListeners() {
      super.setEventListeners();
      this._deleteButton.addEventListener('click', () => {
        this._deleteClick(this._card, this._cardData);
      });
    }
}