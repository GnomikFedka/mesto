import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupText = super.popup.querySelector('.popup__text');
        this._popupFoto = super.popup.querySelector('.popup__foto');
        this._handleEscClose = super._handleEscClose.bind(this);
    }
    
    open(link, name) {
      this._popupFoto.src = link;
      this._popupFoto.alt = name;
      this._popupText.textContent = name;
      super.open();
    }
}