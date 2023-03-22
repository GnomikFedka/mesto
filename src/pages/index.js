import { Section } from '../scripts/components/Section.js';
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
  popupSelectorMesto,
  researcherName,
  activityField,
  inputsOfActivityFieldName,
  inputsArray
} from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

export const cardPopup = new PopupWithImage(popupSelectorMesto);
cardPopup.setEventListeners();

function makeCard(item) {
  const card = new Card({
    data: item, handleCardClick: (name, link) => {
      cardPopup.open(link, name);
    }
  }, elementForm);
  return card.createCard();
}
export const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(makeCard(item));
  }
}, elementsArray);

const validatorOfNewElement = new FormValidator(objectForm, forms.creatElement);
validatorOfNewElement.enableValidation();

export const validatorOfActivityFieldName = new FormValidator(objectForm, forms.nameFieldOfActivity);
validatorOfActivityFieldName.enableValidation();

export const userInfo = new UserInfo(researcherName, activityField);

const formPopupNewElement = new PopupWithForm(popupNewElement,
  {
    submitCallBack: (evt, inputValues) => {
      evt.preventDefault();
      cardList.addItem(makeCard(inputValues));
      formPopupNewElement.closeAndReset();
    }
  }
);

const formActivityFieldName = new PopupWithForm(popupActivityFieldName,
  {
    submitCallBack: (evt, inputValues) => {
      evt.preventDefault();
      userInfo.setUserInfo(inputValues);
      formActivityFieldName.closeAndReset();
    }
  }
);

formActivityFieldName.setEventListenersAndSubmit();
formPopupNewElement.setEventListenersAndSubmit();
editButton.addEventListener('click', () => {
  validatorOfActivityFieldName.resetValidation();
  validatorOfActivityFieldName.enableSubmitButton();
  const nameAndValue = userInfo.getUserInfo();
  inputsOfActivityFieldName.forEach(input => inputsArray[input.name] = input.value);
  inputsArray.profileName = nameAndValue.name;
  inputsArray.fieldOfActivity = nameAndValue.info;
  inputsOfActivityFieldName.forEach(input =>  input.value = inputsArray[input.name]);
  formActivityFieldName.open();
});
addButton.addEventListener('click', () => {
  validatorOfNewElement.resetValidation();
  validatorOfNewElement.disableSubmitButton();
  formPopupNewElement.open();
});

cardList.renderItems(); 