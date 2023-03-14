import { Popup } from "./Popup.js";
import {
    popupFoto,
    popupText
} from '../utils/constants.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._handleEscClose = super._handleEscClose.bind(this);
    }
    
    open(link, name) {
      popupFoto.src = link;
      popupFoto.alt = name;
      popupText.textContent = name;
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
}