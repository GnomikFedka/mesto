let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let nameOfResearcher = document.querySelector('.profile__name');
let fieldOfActivity = document.querySelector('.profile__field-of-activity');
let inputOfResearcher = document.querySelector('.popup__input_type_name');
let inputFieldOfActivity = document.querySelector('.popup__input_type_field-of-activity');
let formData = document.querySelector('.popup__edit-form');

function openPopup() {
  inputOfResearcher.value = nameOfResearcher.innerText;
  inputFieldOfActivity.value = fieldOfActivity.innerText;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveNameAndFieldOfActivity(event) {
  event.preventDefault();
  nameOfResearcher.innerText = inputOfResearcher.value;
  fieldOfActivity.innerText = inputFieldOfActivity.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formData.addEventListener('submit', saveNameAndFieldOfActivity);