const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupActivityFieldName = document.querySelector('.popup_name-field-of-activity');
const popupNewElement = document.querySelector('.popup_new-element');
const popupMesto = document.querySelector('.popup_foto-mesto');
const popupText = popupMesto.querySelector('.popup__text');
const popupFoto = popupMesto.querySelector('.popup__foto');
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
  const like = newElement.querySelector('.elements__button-like');
  const deleteButton = newElement.querySelector('.elements__delete-button');
  foto.src = imageURL;
  foto.alt = fotoName;
  newElement.querySelector('.elements__text').textContent = fotoName;
  like.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-like_active');
  });
  deleteButton.addEventListener('click', function () {
    newElement.remove();
  });
  foto.addEventListener('click', function () {
    popupFoto.src = foto.src;
    popupFoto.alt = foto.alt;
    popupText.textContent = foto.alt;
    openPopup(popupMesto);
  });
  return newElement;
}

function openActivityNameFieldPopup() {
  researcherInput.value = researcherName.innerText;
  activityFieldInput.value = activityField.innerText;
  clearInputError(objectForm, popupActivityFieldName);
  setEventListeners(objectForm, forms.nameFieldOfActivity);
  openPopup(popupActivityFieldName);
}

function openNewElementPopup() {
  forms.createElement.reset();
  clearInputError(objectForm, popupNewElement);
  setEventListeners(objectForm, forms.createElement);
  openPopup(popupNewElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByMouseClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByMouseClick);
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

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

function closeByMouseClick(evt) {
  if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close-icon'))) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}  

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
});

editButton.addEventListener('click', openActivityNameFieldPopup);
addButton.addEventListener('click', openNewElementPopup);
closeButtons.forEach(function (currentValue) {
  const currentPopup = currentValue.closest('.popup');
  currentValue.addEventListener('click', function () {
    closePopup(currentPopup);
  });
});