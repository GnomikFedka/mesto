import { Popup } from "./Popup.js";
import { Card } from '../Card.js';
import {
    forms,
    elementForm
} from '../utils/constants.js';
import { cardList } from "../index.js";
import { userInfo } from "../index.js";
import { cardPopup } from "../index.js";
export class PopupWithForm extends Popup {
    constructor (popupSelector) {
      super(popupSelector);
    }

    getInputValues() {
      return this._popup.querySelectorAll('input');
    }

    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', super._handleEscClose);
      this._popup.querySelector('.popup__container').querySelector('.popup__edit-form').reset();
    }

    setEventListeners () {
      this._closeButton.addEventListener('click', () => {
        this.close();
      });
      this._popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
          this.close();
        }
      });
      const inputs = this.getInputValues();
      if (this._popup.classList.contains('popup_new-element')) {
      forms.createElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const nameAndURL = [inputs[0].value, inputs[1].value];
        const card = new Card({data: nameAndURL, handleCardClick: (name, link) => {
          cardPopup.open(link, name);
         }}, elementForm);
        const cardElement = card.createCard();
        cardList.addItem(cardElement);
        this.close();
      })
      }
      if (this._popup.classList.contains('popup_name-field-of-activity')) {
        forms.nameFieldOfActivity.addEventListener('submit', (evt) => {
          evt.preventDefault();
          userInfo.setUserInfo(inputs);
          this.close();
        })
      }
    }
}