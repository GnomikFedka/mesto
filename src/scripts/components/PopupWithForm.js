import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor (popupSelector, { submitCallBack }) {
      super(popupSelector);
      this._submitCallBack = submitCallBack;
      this._saveButton = this._popup.querySelector('.popup__button-save');
      this._editForm = this._popup.querySelector('.popup__edit-form');
      this._inputs = Array.from(this._editForm.querySelectorAll('input'));
    }

    _getInputValues() {
      const formValues = {};
      this._inputs.forEach((input) => {
        formValues[input.name] = input.value;
      });
      return formValues; 
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
      this._editForm.reset();
    }

    setEventListenersAndSubmit () {
      this.setEventListeners();
      this._editForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallBack(this._getInputValues());
      });
    }
}