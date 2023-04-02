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
  saveButton,
  elementForm,
  popupSelectorMesto,
  popupDeleteConfirmation,
  researcherName,
  activityField,
  avatar,
  avatarFoto,
  avatarPen,
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
  deleteClick: (newElement, cardData) => {
    newElement.remove();
    data.apiDeleteCardJson(cardData);
  }
}, popupDeleteConfirmation);

const data = new Api({
  apiGetUserInfo: (data) => {
    userInfo.setStartUserData(data);
  },
  apiGetCards: (data) => {
    cardList.renderItems(data); 
  },
  apiSetUser: (data) => {
    userInfo.setNameAndActivityField(data); 
  },
  apiSetAvatar: (data) => {
    userInfo.setAvatarFoto(data); 
  },
  apiAddCard: (data) => {
    cardList.addItem(makeCard(data));
  },
  apiAddLike: (card) => {
    //return data.likes;
    console.log(card);
    //console.log(card.likes);
   // data.apiGetLikesJson(card);
    //data.apiGetLikesJson(card);
    setArrayOfLikes(card);
  },
  apiRemoveLike: (card) => {
    //return data.likes;
    console.log(card);
    //console.log(card.likes);
   // data.apiGetLikesJson(card);
    //data.apiGetLikesJson(card);
    setArrayOfLikes(card);
  },
  apiRenderError: (err) => {
    console.log(err);
  }
});

function setArrayOfLikes(data) {
  const id = '.'+data._id;
  console.log(id);
  document.querySelector(id).textContent = data.likes.length;
}

function makeCard(item) {
  const card = new Card({
    cardData: item, handleCardClick: (name, link) => {
      cardPopup.open(link, name);
    },
    addLikeCard: (cardData) => {
      const likeOwner = {
        about: document.querySelector(activityField).textContent,
        avatar: document.querySelector(avatar).src,
        cohort: "cohort-63",
        name: document.querySelector(researcherName).textContent,
       _id: "79ef0491cfddf3bd0ccdf2ca"
      }      
      data.apiAddLikeJson(cardData, likeOwner);
    },
    removeLikeCard: (cardData) => {
      data.apiRemoveLikeJson(cardData);
    },
    openConfirmForm: (newElement, cardData) => {
      deleteCardPopup.setElementAndData(newElement, cardData);
      deleteCardPopup.open();
    }
  }, elementForm);
  return card.createCard();
}

data.apiGetUserJson();
data.apiGetCardsJson();

const validatorOfNewElement = new FormValidator(objectForm, forms.creatElement);
validatorOfNewElement.enableValidation();

export const validatorOfActivityFieldName = new FormValidator(objectForm, forms.nameFieldOfActivity);
validatorOfActivityFieldName.enableValidation();

const validatorOfAvatar = new FormValidator(objectForm, forms.changeAvatar);
validatorOfAvatar.enableValidation();

const formPopupAvatar = new PopupWithForm(popupAvatar,
  {
    submitCallBack: (inputValues) => {
      document.querySelector(popupAvatar).querySelector(saveButton).textContent = 'Сохранение...';
      data.apiSetAvatarJson(userInfo.setAvatarInfo(inputValues));      
      formPopupAvatar.close();
    }
  }
);

const formPopupNewElement = new PopupWithForm(popupNewElement,
  {
    submitCallBack: (inputValues) => { 
      document.querySelector(popupNewElement).querySelector(saveButton).textContent = 'Сохранение...';
      data.apiAddCardJson(inputValues);   
      formPopupNewElement.close();
    }
  }
);

const formActivityFieldName = new PopupWithForm(popupActivityFieldName,
  {
    submitCallBack: (inputValues) => {
      document.querySelector(popupActivityFieldName).querySelector(saveButton).textContent = 'Сохранение...';
      data.apiSetUserJson(userInfo.setUserInfo(inputValues));    
      formActivityFieldName.close();
    }
  }
);

formActivityFieldName.setEventListenersAndSubmit();
formPopupNewElement.setEventListenersAndSubmit();
formPopupAvatar.setEventListenersAndSubmit();
deleteCardPopup.setEventListeners();
editButton.addEventListener('click', () => {
  validatorOfActivityFieldName.resetValidation();
  validatorOfActivityFieldName.enableSubmitButton();
  const nameAndValue = userInfo.getUserInfo();
  inputsOfActivityFieldName.forEach((input) => {
    input.value = nameAndValue[input.name];
  });
  formActivityFieldName.open();
});
addButton.addEventListener('click', () => {
  validatorOfNewElement.resetValidation();
  validatorOfNewElement.disableSubmitButton();
  formPopupNewElement.resetForm();
  formPopupNewElement.open();
});

function changeAvatar () {
  validatorOfAvatar.resetValidation();
  validatorOfAvatar.disableSubmitButton();
  formPopupAvatar.resetForm();
  formPopupAvatar.open();
}
avatarFoto.addEventListener('click', () => {
  changeAvatar();
});
/*
avatarPen.addEventListener('click', () => {
  changeAvatar();
}); */