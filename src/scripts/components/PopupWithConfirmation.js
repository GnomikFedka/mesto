import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor({ deleteClick }, popupSelector) {
        super(popupSelector);
        this._deleteClick = deleteClick;
        this._deleteButton = this._popup.querySelector('.popup__button-delete');
        this._newElement = Object;
        this._cardData = Object;
    }

    setElementAndData(newElement, cardData) {
      this._newElement = newElement;
      this._cardData = cardData;
    }

    close() {
      super.close();
    }
    
    setEventListeners() {
      super.setEventListeners();
      this._deleteButton.addEventListener('click', () => {
        this._deleteClick(this._newElement, this._cardData);
        this.close();
      });
    }
}