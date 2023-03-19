export class FormValidator {
  constructor(objectForm, formElement) {
    this._objectForm = objectForm;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._objectForm.inputSelector));
    this._formButtonElement = this._formElement.querySelector(this._objectForm.submitButtonSelector);
  }

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._objectForm.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._objectForm.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  resetValidation() {
    this._toggleButtonState(); 
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

  }

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    }
    else {
      this.enableSubmitButton();
    }
  }

  enableSubmitButton = () => {
    this._formButtonElement.classList.remove(this._objectForm.inactiveButtonClass);
    this._formButtonElement.removeAttribute("disabled", "disabled");
  }

  disableSubmitButton = () => {
    this._formButtonElement.classList.add(this._objectForm.inactiveButtonClass);
    this._formButtonElement.setAttribute("disabled", "disabled");
  }
}