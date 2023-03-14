import notr_dam from '../../images/notr_dam.jpg';
import LaucaNationalPark from '../../images/LaucaNationalPark.jpg';
import grand_canyon from '../../images/grand_canyon.jpg';
import fuji from '../../images/fuji.jpg';
import great_wall from '../../images/great_wall.jpg';
import sevan_lake from '../../images/sevan_lake.jpg';
const mesta = [
  { name: 'notr_dam', image: '../../images/notr_dam.jpg'},
  { name: 'LaucaNationalPark', image: '../../images/LaucaNationalPark.jpg'},
  { name: 'grand_canyon', image: '../../images/grand_canyon.jpg'},
  { name: 'fuji', image: '../../images/fuji.jpg'},
  { name: 'great_wall', image: '../../images/great_wall.jpg'},
  { name: 'sevan_lake', image: '../../images/sevan_lake.jpg'},
]; 
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const popups = document.querySelectorAll('.popup');
export const popupActivityFieldName = '.popup_name-field-of-activity';
export const popupNewElement = '.popup_new-element';
export const closeButtons = document.querySelectorAll('.popup__close-button');
export const researcherName = document.querySelector('.profile__name');
export const activityField = document.querySelector('.profile__field-of-activity');
export const forms = document.forms;
export const elementsArray = document.querySelector('.elements');
export const popupSelectorMesto = '.popup_foto-mesto';
export const popupMesto = document.querySelector('.popup_foto-mesto');
export const popupText = popupMesto.querySelector('.popup__text');
export const popupFoto = popupMesto.querySelector('.popup__foto');
export const elementTemplate = document.querySelector('#element').content;
export const elementForm = elementTemplate.querySelector('.elements__element');
export const cardPopup = Object;
export const objectForm = {
  formSelector: '.popup__edit-form',
  inputSelector: 'input.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
export const initialCards = [
  {
    name: 'Собор Парижской Богоматери',
    link: notr_dam
  },
  {
    name: 'Национальный парк Лаука',
    link: LaucaNationalPark
  },
  {
    name: 'Большой Каньон',
    link: grand_canyon
  },
  {
    name: 'Вулкан Фудзияма',
    link: fuji
  },
  {
    name: 'Великая Китайская стена',
    link: great_wall
  },
  {
    name: 'Озеро Севан',
    link: sevan_lake
  }
];