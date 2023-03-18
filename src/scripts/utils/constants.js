import notr_dam from '../../images/notr_dam.jpg';
import LaucaNationalPark from '../../images/LaucaNationalPark.jpg';
import grand_canyon from '../../images/grand_canyon.jpg';
import fuji from '../../images/fuji.jpg';
import great_wall from '../../images/great_wall.jpg';
import sevan_lake from '../../images/sevan_lake.jpg';
const mesta = [
  { name: 'notr_dam', link: '../../images/notr_dam.jpg'},
  { name: 'LaucaNationalPark', link: '../../images/LaucaNationalPark.jpg'},
  { name: 'grand_canyon', link: '../../images/grand_canyon.jpg'},
  { name: 'fuji', link: '../../images/fuji.jpg'},
  { name: 'great_wall', link: '../../images/great_wall.jpg'},
  { name: 'sevan_lake', link: '../../images/sevan_lake.jpg'},
]; 
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const popups = document.querySelectorAll('.popup');
export const popupActivityFieldName = '.popup_name-field-of-activity';
export const popupNewElement = '.popup_new-element';
export const closeButtons = document.querySelectorAll('.popup__close-button');
export const forms = document.forms;
export const popupActivityFieldNameButton = forms.nameFieldOfActivity.querySelector('popup__button-save')
export const elementsArray = '.elements';
export const popupSelectorMesto = '.popup_foto-mesto';
export const popupMesto = document.querySelector('.popup_foto-mesto');
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