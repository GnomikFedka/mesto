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

export const userInfo = new UserInfo(popupActivityFieldName);

const formPopupNewElement = new PopupWithForm(popupNewElement,
  {
    submitCallBack: () => {
      forms.creatElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        cardList.addItem(makeCard(formPopupNewElement.returnInputValues()));
        formPopupNewElement.close();
      })
    }
  }
);

const formActivityFieldName = new PopupWithForm(popupActivityFieldName,
  {
    submitCallBack: () => {
      forms.nameFieldOfActivity.addEventListener('submit', (evt) => {
        evt.preventDefault();
        userInfo.setUserInfo();
        formActivityFieldName.close();
      })
    }
  }
);

formActivityFieldName.setEventListenersAndSubmit();
formPopupNewElement.setEventListenersAndSubmit();
editButton.addEventListener('click', () => {
  validatorOfActivityFieldName.resetValidation();
  validatorOfActivityFieldName.enableSubmitButton();
  userInfo.getUserInfo();
  formActivityFieldName.open();
});
addButton.addEventListener('click', () => {
  validatorOfNewElement.resetValidation();
  validatorOfNewElement.disableSubmitButton();
  formPopupNewElement.open();
});

cardList.renderItems(); 