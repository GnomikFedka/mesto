export class FormValidator {
  constructor(objectForm, formElement) {
    this._objectForm = objectForm;
    this._formElement = formElement;
  }

  _showInputError = (objectForm, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objectForm.errorClass);
  };

  hideInputError = (objectForm, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(objectForm.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (objectForm, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(objectForm, formElement, inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(objectForm, formElement, inputElement);
    }
  };

  setEventListeners = (objectForm, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(objectForm.inputSelector));
    const formButtonElement = formElement.querySelector(objectForm.submitButtonSelector);
    this.toggleButtonState(objectForm, inputList, formButtonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(objectForm, formElement, inputElement);
        this.toggleButtonState(objectForm, inputList, formButtonElement);
      });
    });
  };

  enableValidation = () => {
    this.setEventListeners(this._objectForm, this._formElement);
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState = (objectForm, inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(objectForm.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    }
    else {
      buttonElement.classList.remove(objectForm.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", "disabled");
    }
  }
}