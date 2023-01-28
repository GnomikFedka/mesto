import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupActivityFieldName = document.querySelector('.popup_name-field-of-activity');
const popupNewElement = document.querySelector('.popup_new-element');
const closeButtons = document.querySelectorAll('.popup__close-button');
const researcherName = document.querySelector('.profile__name');
const activityField = document.querySelector('.profile__field-of-activity');
const researcherInput = popupActivityFieldName.querySelector('.popup__input_type_name');
const activityFieldInput = popupActivityFieldName.querySelector('.popup__input_type_field-of-activity');
const forms = document.forms;
const saveButtonNewElement = forms.createElement.querySelector('.popup__button-save');
const saveButtonActivityFieldName = forms.nameFieldOfActivity.querySelector('.popup__button-save');
const elementsArray = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;
const elementForm = elementTemplate.querySelector('.elements__element');
const objectForm = {
  formSelector: '.popup__edit-form',
  inputSelector: 'input.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
const inputListNewElement = Array.from(forms.createElement.querySelectorAll(objectForm.inputSelector));
const inputListActivityFieldName = Array.from(forms.nameFieldOfActivity.querySelectorAll(objectForm.inputSelector));
const initialCards = [
  {
    name: 'Собор Парижской Богоматери',
    link: 'images/notr_dam.jpg'
  },
  {
    name: 'Национальный парк Лаука',
    link: 'images/LaucaNationalPark.jpg'
  },
  {
    name: 'Большой Каньон',
    link: 'images/grand_canyon.jpg'
  },
  {
    name: 'Вулкан Фудзияма',
    link: 'images/fuji.jpg'
  },
  {
    name: 'Великая Китайская стена',
    link: 'images/great_wall.jpg'
  },
  {
    name: 'Озеро Севан',
    link: 'images/sevan_lake.jpg'
  }
];

const validatorOfNewElement = new FormValidator(objectForm, forms.createElement);
validatorOfNewElement.enableValidation();

const validatorOfActivityFieldName = new FormValidator(objectForm, forms.nameFieldOfActivity);
validatorOfActivityFieldName.enableValidation();

initialCards.forEach(function (currentValue) {
  const place = new Card(currentValue.name, currentValue.link, elementForm);
  elementsArray.prepend(place.createCard());
});

function openActivityNameFieldPopup() {
  researcherInput.value = researcherName.innerText;
  activityFieldInput.value = activityField.innerText;
  clearInputError(objectForm, popupActivityFieldName, validatorOfActivityFieldName);
  validatorOfActivityFieldName.toggleButtonState(objectForm, inputListActivityFieldName, saveButtonActivityFieldName)
  openPopup(popupActivityFieldName);
}

function openNewElementPopup() {
  forms.createElement.reset();
  clearInputError(objectForm, popupNewElement, validatorOfNewElement);
  validatorOfNewElement.toggleButtonState(objectForm, inputListNewElement, saveButtonNewElement);
  openPopup(popupNewElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

popups.forEach(function (currentValue) {
  currentValue.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(currentValue);
    }
  });
});

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function clearInputError(objectFormData, popup, validator) {
  const inputList = Array.from(popup.querySelectorAll(objectFormData.inputSelector));
  inputList.forEach(function (currentValue) {
    validator.hideInputError(objectFormData, popup, currentValue);
  });
}

forms.nameFieldOfActivity.addEventListener('submit', function (evt) {
  evt.preventDefault();
  researcherName.textContent = researcherInput.value;
  activityField.textContent = activityFieldInput.value;
  closePopup(popupActivityFieldName);
});

forms.createElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const placeName = forms.createElement.elements.name.value;
  const placeURL = forms.createElement.elements.fieldOfActivity.value;
  const newPlace = new Card(placeName, placeURL, elementForm);
  elementsArray.prepend(newPlace.createCard());
  closePopup(popupNewElement);
});

editButton.addEventListener('click', openActivityNameFieldPopup);
addButton.addEventListener('click', openNewElementPopup);
closeButtons.forEach(function (currentValue) {
  const currentPopup = currentValue.closest('.popup');
  currentValue.addEventListener('click', function () {
    closePopup(currentPopup);
  });
});