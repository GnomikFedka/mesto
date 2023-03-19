import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor (popupSelector, { submitCallBack }) {
      super(popupSelector);
      this._submitCallBack = submitCallBack;
      this._editform = this._popup.querySelector('.popup__container').querySelector('.popup__edit-form');
      this._inputs = this._popup.querySelectorAll('input');
    }

    _getInputValues() {
      return {
        name: this._inputs[0].value,
        info: this._inputs[1].value
      }
    }

    returnInputValues() {
      return this._getInputValues();
    }

    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      this._editform.reset();
    }

    setEventListenersAndSubmit () {
      this.setEventListeners();
      this._submitCallBack();
    }
}