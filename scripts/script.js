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
const placeName = popupNewElement.querySelector('.popup__input_type_name');
const placeURL = popupNewElement.querySelector('.popup__input_type_field-of-activity');
const elementTemplate = document.querySelector('#element').content;
const elementForm = elementTemplate.querySelector('.elements__element');
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

initialCards.forEach(function(currentValue) {
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
} 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function editProfile () {
  researcherName.textContent = researcherInput.value;
  activityField.textContent = activityFieldInput.value;
  closePopup(popupActivityFieldName);
}

function resetFormNewCard() {
  placeName.value = '';
  placeURL.value = '';
}

function saveNewCard () {
  createCard(placeName.value, placeURL.value);
  closePopup(popupNewElement);
  resetFormNewCard();
}

function saveFormData(event) {
  event.preventDefault();
  const targetId = event.currentTarget.id;
  if (targetId === 'name-field-of-activity') {
    editProfile();
  }
  if (targetId === 'create-element') {
    saveNewCard();
  } 
}

editButton.addEventListener('click', openActivityNameFieldPopup);
addButton.addEventListener('click', openNewElementPopup);
closeButtons.forEach(function(currentValue) {
  currentValue.addEventListener('click', function () {
    const currentPopup = currentValue.closest('.popup');
    closePopup(currentPopup);
    if (currentPopup.classList.contains('popup_new-element')) {
      resetFormNewCard();
    }
  });
  
});
forms.forEach(function(currentValue) {
  currentValue.addEventListener('submit', saveFormData);
});