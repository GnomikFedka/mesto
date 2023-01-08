const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupActivityFieldName = document.querySelector('.popup_name-field-of-activity');
const popupNewElement = document.querySelector('.popup_new-element');
const popupMesto = document.querySelector('.popup_foto-mesto');
const popupText = popupMesto.querySelector('.popup__text')
const closeButtons = document.querySelectorAll('.popup__close-button');
const elementsArray = document.querySelector('.elements');
const researcherName = document.querySelector('.profile__name');
const activityField = document.querySelector('.profile__field-of-activity');
const researcherInput = popupActivityFieldName.querySelector('.popup__input_type_name');
const activityFieldInput = popupActivityFieldName.querySelector('.popup__input_type_field-of-activity');
const elementTemplate = document.querySelector('#element').content;
const elementForm = elementTemplate.querySelector('.elements__element');
const forms = document.forms;
const objectForm = {
  formSelector: '.popup__edit-form',
  inputSelector: 'input.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
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

initialCards.forEach(function (currentValue) {
  renderCard(currentValue.name, currentValue.link)
});

function renderCard(fotoName, imageURL) {
  elementsArray.prepend(createCard(fotoName, imageURL));
}

function createCard(fotoName, imageURL) {
  const newElement = elementForm.cloneNode(true);
  const foto = newElement.querySelector('.elements__mask-group');
  foto.src = imageURL;
  foto.alt = fotoName;
  newElement.querySelector('.elements__text').textContent = fotoName;
  newElement.querySelector('.elements__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-like_active');
  });
  newElement.querySelector('.elements__delete-button').addEventListener('click', function () {
    newElement.remove();
  });
  foto.addEventListener('click', function () {
    const popupFoto = popupMesto.querySelector('.popup__foto');
    popupFoto.src = foto.src;
    popupFoto.alt = foto.alt;
    popupText.textContent = foto.alt;
    openPopup(popupMesto);
  });
  return newElement;
}

function deleteElement(evt) {
  evt.target.closest.remove();
}

function openActivityNameFieldPopup() {
  researcherInput.value = researcherName.innerText;
  activityFieldInput.value = activityField.innerText;
  enableValidation(objectForm);
  openPopup(popupActivityFieldName);
}

function openNewElementPopup() {
  enableValidation(objectForm);
  openPopup(popupNewElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popups.forEach(function (currentValue) {
  currentValue.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(currentValue);
    }
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === "Escape") {
      closePopup(currentValue);
    }
  });
});

popupNewElement.addEventListener('click', function (evt) {
  if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close-icon'))) {
    clearInputError(objectForm, popupNewElement);
    forms.createElement.reset();
  }
});

popupActivityFieldName.addEventListener('click', function (evt) {
  if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close-icon'))) {
    clearInputError(objectForm, popupActivityFieldName);
  }
});

popupNewElement.addEventListener('keydown', function (evt) {
  if (evt.key === "Escape") {
    clearInputError(objectForm, popupNewElement);
    forms.createElement.reset();
  }
});

popupActivityFieldName.addEventListener('keydown', function (evt) {
  if (evt.key === "Escape") {
    clearInputError(objectForm, popupActivityFieldName);
  }
});

function clearInputError(objectFormData, popup) {
  const inputList = Array.from(popup.querySelectorAll(objectFormData.inputSelector));
  inputList.forEach(function (currentValue) {
    hideInputError(objectFormData, popup, currentValue);
  });
}

forms.nameFieldOfActivity.addEventListener('submit', function (evt) {
  evt.preventDefault();
  researcherName.textContent = researcherInput.value;
  activityField.textContent = activityFieldInput.value;
  closePopup(popupActivityFieldName);
  clearInputError(objectForm, popupActivityFieldName)
});

forms.createElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const placeName = forms.createElement.elements.name;
  const placeURL = forms.createElement.elements.fieldOfActivity;
  renderCard(placeName.value, placeURL.value);
  closePopup(popupNewElement);
  clearInputError(objectForm, popupNewElement);
  forms.createElement.reset();
});

editButton.addEventListener('click', openActivityNameFieldPopup);
addButton.addEventListener('click', openNewElementPopup);
closeButtons.forEach(function (currentValue) {
  const currentPopup = currentValue.closest('.popup');
  currentValue.addEventListener('click', function () {
    closePopup(currentPopup);
  });
});