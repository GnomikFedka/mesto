import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor (popupSelector, { submitCallBack }) {
      super(popupSelector);
      this._submitCallBack = submitCallBack;
      this._editform = this._popup.querySelector('.popup__edit-form');
      this._inputs = Array.from(this._editform.querySelectorAll('input'));
    }

    _getInputValues() {
      const formValues = {};
      this._inputs.forEach((input) => {
        formValues[input.name] = input.value;
      });
      return formValues; 
    }

    closeAndReset() {
      this.close();
      this._editform.reset();
    }

    setEventListenersAndSubmit () {
      this.setEventListeners();
      this._editform.addEventListener('submit', () => {
        console.log(this._getInputValues());
        this._submitCallBack(this._getInputValues())
      });
    }
}