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
  
  const checkInputValidity = (objectFormData, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(objectFormData, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(objectFormData, formElement, inputElement);
    }
  };
  
  const setEventListeners = (objectFormData, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(objectFormData.inputSelector));
    const formButtonElement = formElement.querySelector(objectFormData.submitButtonSelector);
    toggleButtonState(objectFormData, inputList, formButtonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(objectFormData, formElement, inputElement);
        toggleButtonState(objectFormData, inputList, formButtonElement);
      });
    });
  };
  
  const enableValidation = (objectFormData) => {
    const formList = Array.from(document.querySelectorAll(objectFormData.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(objectFormData, formElement);
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
      buttonElement.setAttribute("disabled", "disabled");
    }
    else {
      buttonElement.classList.remove(objectFormData.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", "disabled");
    }
  }