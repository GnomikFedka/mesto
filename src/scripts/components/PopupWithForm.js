import { Popup } from "./Popup.js";
import {
  validatorOfActivityFieldName
} from '../../pages/index.js';
export class PopupWithForm extends Popup {
    constructor (popupSelector, { submitCallBack }) {
      this._submitCallBack = submitCallBack;
      super(popupSelector);
      this._popupNewElement = this._popup.classList.contains('popup_new-element');
      this._popupNameFieldOfActivity = this._popup.classList.contains('popup_new-element');
      this._editform = this._popup.querySelector('.popup__container').querySelector('.popup__edit-form');
    }

    _getInputValues() {
      const inputs = this._popup.querySelectorAll('input');
      return {
        name: inputs[0].value,
        info: inputs[1].value
      }
    }

    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
      if (this._popup.classList.contains('popup_new-element')) {
        validatorOfActivityFieldName.disableSubmitButton();
      }
    }

    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      this._editform.reset();
    }

    setEventListenersAndSubmit () {
      this.setEventListeners();
      this._submitCallBack(this._getInputValues());
    }
}