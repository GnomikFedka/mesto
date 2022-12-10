const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNameFieldOfActivity = document.querySelector('.popup_name-field-of-activity');
const popupNewElement = document.querySelector('.popup_new-element');
const popupMesto = document.querySelector('.popup_foto-mesto');
const closeButton = document.querySelectorAll('.popup__close-button');
const elementsArray = document.querySelector('.elements');
const elements = elementsArray.querySelectorAll('.elements__element');
const formData = document.querySelectorAll('.popup__edit-form');
let nameOfResearcher = document.querySelector('.profile__name');
let fieldOfActivity = document.querySelector('.profile__field-of-activity');
let inputOfResearcher = popupNameFieldOfActivity.querySelector('.popup__input_type_name');
let inputFieldOfActivity = popupNameFieldOfActivity.querySelector('.popup__input_type_field-of-activity');
let placeName = popupNewElement.querySelector('.popup__input_type_name');
let placeURL = popupNewElement.querySelector('.popup__input_type_field-of-activity');
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

function saveFotoAndURL(fotoName, imageURL) {
  closePopup();
  const elementTemplate = document.querySelector('#element').content;
  const newElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  newElement.querySelector('.elements__mask-group').src = imageURL;
  newElement.querySelector('.elements__text').textContent = fotoName;
  elementsArray.prepend(newElement);
  newElement.querySelector('.elements__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-like_active');
  });
  newElement.querySelector('.elements__delete-button').addEventListener('click', function (evt) {
    evt.target.parentElement.remove(); 
  });
  newElement.querySelector('.elements__button-open-foto').addEventListener('click', function (evt) {
    popupMesto.querySelector('.popup__foto').src = evt.target.parentElement.querySelector('.elements__mask-group').src; 
    popupMesto.querySelector('.popup__text').textContent = evt.target.parentElement.querySelector('.elements__text').textContent;
    openPopup(popupMesto);
  });
}

elements.forEach(function(currentValue, index) {
  currentValue.querySelector('.elements__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-like_active');
  });
  currentValue.querySelector('.elements__mask-group').src = initialCards[index].link;
  currentValue.querySelector('.elements__text').textContent = initialCards[index].name;
}); 

function openNameFieldOfActivity() {
  inputOfResearcher.value = nameOfResearcher.innerText;
  inputFieldOfActivity.value = fieldOfActivity.innerText;
  openPopup(popupNameFieldOfActivity);
}

function openNewElement() {
  openPopup(popupNewElement);
}

function openPopupMesto(evt) {
  popupMesto.querySelector('.popup__foto').src = evt.target.parentElement.querySelector('.elements__mask-group').src; 
  popupMesto.querySelector('.popup__text').textContent = evt.target.parentElement.querySelector('.elements__text').textContent;
  openPopup(popupMesto);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
} 

function deleteElement(evt) {
  evt.target.parentElement.remove();  
}

function closePopup() {
  popupNameFieldOfActivity.classList.remove('popup_opened');
  popupNewElement.classList.remove('popup_opened');
  popupMesto.classList.remove('popup_opened');
}

function save(event) {
  event.preventDefault();
  if (popupNameFieldOfActivity.classList.contains('popup_opened') === true) {
    nameOfResearcher.innerText = inputOfResearcher.value;
    fieldOfActivity.innerText = inputFieldOfActivity.value;
    closePopup();
  } else
      if (popupNewElement.classList.contains('popup_opened') === true) {
        saveFotoAndURL(placeName.value, placeURL.value);
        placeName.value = '';
        placeURL.value = '';
      } 
}

editButton.addEventListener('click', openNameFieldOfActivity);
addButton.addEventListener('click', openNewElement);
elements.forEach(function(currentValue) {
  currentValue.querySelector('.elements__delete-button').addEventListener('click', deleteElement);
});
elements.forEach(function(currentValue) {
  currentValue.querySelector('.elements__button-open-foto').addEventListener('click', openPopupMesto);
});
closeButton.forEach(function(currentValue) {
  currentValue.addEventListener('click', closePopup);
});
formData.forEach(function(currentValue) {
  currentValue.addEventListener('submit', save);
});