const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupActivityFieldName = document.querySelector('.popup_name-field-of-activity');
const popupNewElement = document.querySelector('.popup_new-element');
const popupMesto = document.querySelector('.popup_foto-mesto');
const closeButtons = document.querySelectorAll('.popup__close-button');
const elementsArray = document.querySelector('.elements');
const forms = document.querySelectorAll('.popup__edit-form');
const researcherName = document.querySelector('.profile__name');
const activityField = document.querySelector('.profile__field-of-activity');
const researcherInput = popupActivityFieldName.querySelector('.popup__input_type_name');
const activityFieldInput = popupActivityFieldName.querySelector('.popup__input_type_field-of-activity');
const elementTemplate = document.querySelector('#element').content;
const elementForm = elementTemplate.querySelector('.elements__element');
const form = document.forms;
const objectForm = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input',
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

researcherInput.value = researcherName.innerText;
activityFieldInput.value = activityField.innerText;

initialCards.forEach(function (currentValue) {
  createCard(currentValue.name, currentValue.link)
});

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
  newElement.querySelector('.elements__mask-group').addEventListener('click', function (evt) {
    const popupFoto = popupMesto.querySelector('.popup__foto');
    popupFoto.src = foto.src;
    popupFoto.alt = foto.alt;
    popupMesto.querySelector('.popup__text').textContent = foto.alt;
    openPopup(popupMesto);
  });
  elementsArray.prepend(newElement);
}

function deleteElement(evt) {
  evt.target.parentElement.remove();
}

function openActivityNameFieldPopup() {
  researcherInput.value = researcherName.innerText;
  activityFieldInput.value = activityField.innerText;
  openPopup(popupActivityFieldName);
}

function openNewElementPopup() {
  openPopup(popupNewElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', function (event) {
    const container = popup.querySelector('.popup__container');
    const coordinates = container.getBoundingClientRect();
    if ((event.clientX < coordinates.x) || (event.clientX > coordinates.x + coordinates.width) ||
      (event.clientY < coordinates.y) || (event.clientY > coordinates.y + coordinates.height)) {
      closePopup(popup);
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
      closePopup(popup);
    }
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', function (event) {
    const container = popup.querySelector('.popup__container');
    const coordinates = container.getBoundingClientRect();
    if ((event.clientX < coordinates.x) || (event.clientX > coordinates.x + coordinates.width) ||
      (event.clientY < coordinates.y) || (event.clientY > coordinates.y + coordinates.height)) {
      closePopup(currentValue);
    }
  });
  document.removeEventListener('keydown', function (event) {
    if (event.key === "Escape") {
      closePopup(popup);
    }
  });
}

form.nameFieldOfActivity.addEventListener('submit', function (evt) {
  evt.preventDefault();
  researcherName.textContent = researcherInput.value;
  activityField.textContent = activityFieldInput.value;
  closePopup(popupActivityFieldName);
});

form.createElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const placeName = form.createElement.elements.name;
  const placeURL = form.createElement.elements.fieldOfActivity;
  createCard(placeName.value, placeURL.value);
  closePopup(popupNewElement);
  form.createElement.reset();
});

editButton.addEventListener('click', openActivityNameFieldPopup);
addButton.addEventListener('click', openNewElementPopup);
closeButtons.forEach(function (currentValue) {
  currentValue.addEventListener('click', function () {
    const currentPopup = currentValue.closest('.popup');
    closePopup(currentPopup);
    if (currentPopup.classList.contains('popup_new-element')) {
      form['create-element'].reset();
    }
  });
});