const showInputError = (objectFormData, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objectFormData.errorClass);
  };
  
  const hideInputError = (objectFormData, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(objectFormData.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(objectForm, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(objectForm, formElement, inputElement);
    }
  };
  
  const setEventListeners = (objectFormData, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(objectFormData.inputSelector));
    const formButtonElement = formElement.querySelector(objectFormData.submitButtonSelector);
    toggleButtonState(objectForm, inputList, formButtonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(objectForm, inputList, formButtonElement);
      });
    });
  };
  
  const enableValidation = (objectFormData) => {
    const formList = Array.from(document.querySelectorAll(objectFormData.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(objectForm, formElement);
    });
  };
  
  enableValidation(objectForm); 
  
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  
  function toggleButtonState (objectFormData, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(objectFormData.inactiveButtonClass);
    }
    else buttonElement.classList.remove(objectFormData.inactiveButtonClass);
  }