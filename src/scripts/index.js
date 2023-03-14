import { Section } from './components/Section.js';
import '../pages/index.css';
import {
  initialCards,
  elementsArray,
  objectForm,
  forms,
  popupActivityFieldName,
  popupNewElement,
  editButton,
  addButton,
  elementForm,
  popupSelectorMesto
} from './utils/constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
console.log('консоль');
export const cardList = new Section({
         items: initialCards,
         renderer: (item) => {
           const nameAndURL = [item.name, item.link];
           const card = new Card({data: nameAndURL, handleCardClick: (name, link) => {
            cardPopup.open(link, name);
           }}, elementForm);
           const cardElement = card.createCard();
           cardList.addItem(cardElement);
         }
      }, elementsArray);

const validatorOfNewElement = new FormValidator(objectForm, forms.createElement);
validatorOfNewElement.enableValidation();

const validatorOfActivityFieldName = new FormValidator(objectForm, forms.nameFieldOfActivity);
validatorOfActivityFieldName.enableValidation();

const formPopupNewElement = new PopupWithForm(popupNewElement);

const formActivityFieldName = new PopupWithForm(popupActivityFieldName);

export const userInfo = new UserInfo();

export const cardPopup = new PopupWithImage (popupSelectorMesto);
cardPopup.setEventListeners();

formActivityFieldName.setEventListeners();
formPopupNewElement.setEventListeners();
editButton.addEventListener('click', () => {
  formActivityFieldName.open();
  userInfo.getUserInfo(formActivityFieldName.getInputValues());
});
addButton.addEventListener('click', () => {
  formPopupNewElement.open();
});


cardList.renderItems(); 