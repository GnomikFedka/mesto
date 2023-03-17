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
  popupSelectorMesto
} from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

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

const validatorOfNewElement = new FormValidator(objectForm, forms.createElement);
validatorOfNewElement.enableValidation();

export const validatorOfActivityFieldName = new FormValidator(objectForm, forms.nameFieldOfActivity);
validatorOfActivityFieldName.enableValidation();

export const userInfo = new UserInfo();

const formPopupNewElement = new PopupWithForm(popupNewElement,
  {
    submitCallBack: (item) => {
      if (this._popupNewElement) {
        forms.createElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          cardList.addItem(makeCard(item));
          this.close();
        })
      }
      if (this._popupNameFieldOfActivity) {
        forms.nameFieldOfActivity.addEventListener('submit', (evt) => {
          evt.preventDefault();
          userInfo.setUserInfo(item);
          this.close();
        })
      }
    }
  }
);

const formActivityFieldName = new PopupWithForm(popupActivityFieldName,
  {
    submitCallBack: (item) => {
      if (this._popupNewElement) {
        forms.createElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          cardList.addItem(makeCard(item));
        })
      }
      if (this._popupNameFieldOfActivity) {
        forms.nameFieldOfActivity.addEventListener('submit', (evt) => {
          evt.preventDefault();
          userInfo.setUserInfo(item);
          this.close();
        })
      }
    }
  }
);

export const cardPopup = new PopupWithImage(popupSelectorMesto);
cardPopup.setEventListeners();

formActivityFieldName.setEventListenersAndSubmit();
formPopupNewElement.setEventListenersAndSubmit();
editButton.addEventListener('click', () => {
  formActivityFieldName.open();
  userInfo.getUserInfo(formActivityFieldName.getInputValues());
});
addButton.addEventListener('click', () => {
  formPopupNewElement.open();
});


cardList.renderItems(); 