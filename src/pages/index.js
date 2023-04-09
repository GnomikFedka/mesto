let userId = null;
import { Section } from '../scripts/components/Section.js';
import '../pages/index.css';
import {
  elementsArray,
  objectForm,
  forms,
  popupActivityFieldName,
  popupNewElement,
  popupAvatar,
  editButton,
  addButton,
  elementForm,
  popupSelectorMesto,
  popupDeleteConfirmation,
  researcherName,
  activityField,
  avatar,
  avatarFoto,
  avatarPen,
  headers,
  inputsOfActivityFieldName
} from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';

export const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(makeCard(item));
  }
}, elementsArray);

export const cardPopup = new PopupWithImage(popupSelectorMesto);
cardPopup.setEventListeners();

export const userInfo = new UserInfo(researcherName, activityField, avatar);

const deleteCardPopup = new PopupWithConfirmation({
  deleteClick: (card, cardData) => {
    api.apiDeleteCardJson(card, cardData)
    .then(() => {
      card.deleteCard();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }
}, popupDeleteConfirmation);

const api = new Api(headers);

function makeCard(item) {
  const card = new Card({
    cardData: item, handleCardClick: (name, link) => {
      cardPopup.open(link, name);
    },
    addLikeCard: (card) => {
      api.apiAddLikeJson(card)
      .then((cardData) => {
        card.changeLikesQuantity(cardData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
    },
    removeLikeCard: (card) => {
      api.apiRemoveLikeJson(card)
      .then((cardData) => {
        card.changeLikesQuantity(cardData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
    },
    openConfirmForm: (card, cardData) => {
      deleteCardPopup.setElementAndData(card, cardData);
      deleteCardPopup.open();
    }
  }, elementForm, userId);
  return card.createCard();
}

Promise.all([
  api.apiGetUserJson(),
  api.apiGetCardsJson()
])
.then(([userData, cardsData]) => {
  userId = userData._id;
  userInfo.setStartUserData(userData);
  cardList.renderItems(cardsData);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`)
})


const validatorOfNewElement = new FormValidator(objectForm, forms.creatElement);
validatorOfNewElement.enableValidation();

export const validatorOfActivityFieldName = new FormValidator(objectForm, forms.nameFieldOfActivity);
validatorOfActivityFieldName.enableValidation();

const validatorOfAvatar = new FormValidator(objectForm, forms.changeAvatar);
validatorOfAvatar.enableValidation();

const formPopupAvatar = new PopupWithForm(popupAvatar,
  {
    submitCallBack: (inputValues) => {
      formPopupAvatar.changeButtonText(true);
      api.apiSetAvatarJson(inputValues)
      .then((urlAvatar) => {
        userInfo.setAvatarFoto(urlAvatar);
        formPopupAvatar.close(); 
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        formPopupAvatar.changeButtonText(false, 'Сохранить');
      }) ;
    }
  }
);

const formPopupNewElement = new PopupWithForm(popupNewElement,
  {
    submitCallBack: (inputValues) => { 
      formPopupNewElement.changeButtonText(true);
      api.apiAddCardJson(inputValues)
      .then((cardData) => {
        cardList.addItem(makeCard(cardData)); 
        formPopupNewElement.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        formPopupNewElement.changeButtonText(false, 'Создать');
      });  
    }
  }
);

const formActivityFieldName = new PopupWithForm(popupActivityFieldName,
  {
    submitCallBack: (inputValues) => {
      formActivityFieldName.changeButtonText(true);
      api.apiSetUserJson(inputValues)
      .then((userNameAndFieldOfActivity) => {
        userInfo.setNameAndActivityField(userNameAndFieldOfActivity); 
        formActivityFieldName.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        formActivityFieldName.changeButtonText(false, 'Сохранить');
      });    
    }
  }
);

formActivityFieldName.setEventListenersAndSubmit();
formPopupNewElement.setEventListenersAndSubmit();
formPopupAvatar.setEventListenersAndSubmit();
deleteCardPopup.setEventListeners();
editButton.addEventListener('click', openUserPopup);
function openUserPopup() {
  validatorOfActivityFieldName.resetValidation();
  validatorOfActivityFieldName.enableSubmitButton();
  const nameAndValue = userInfo.getUserInfo();
  inputsOfActivityFieldName.forEach((input) => {
    input.value = nameAndValue[input.name];
  });
  formActivityFieldName.open();
}

addButton.addEventListener('click', openNewCardPopup);
function openNewCardPopup() {
  validatorOfNewElement.resetValidation();
  validatorOfNewElement.disableSubmitButton();
  formPopupNewElement.open();
}

avatarFoto.addEventListener('click', changeAvatar);
avatarPen.addEventListener('click', changeAvatar);
function changeAvatar () {
  validatorOfAvatar.resetValidation();
  validatorOfAvatar.disableSubmitButton();
  formPopupAvatar.open();
}