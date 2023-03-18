import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupText = this._popup.querySelector('.popup__text');
        this._popupFoto = this._popup.querySelector('.popup__foto');
    }
    
    open(link, name) {
      super.open();
      this._popupFoto.src = link;
      this._popupFoto.alt = name;
      this._popupText.textContent = name;
    }
}