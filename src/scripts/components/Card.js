export class Card {
  constructor({cardData, handleCardClick, addLikeCard, openConfirmForm, removeLikeCard}, elementForm, userId) {
    this._cardData = cardData;
    this._fotoName = cardData.name;
    this._imageURL = cardData.link;
    this._cardOwner = cardData.owner;
    this._cardOwnerId = cardData.owner._id;
    this._likeArray = cardData.likes;
    this._handleCardClick = handleCardClick;
    this._addLikeCard = addLikeCard;
    this._removeLikeCard = removeLikeCard;
    this._elementForm = elementForm;
    this._userId = userId;
    this._newElement = this._getTemplate();
    this._cardName = this._newElement.querySelector('.elements__text');
    this._cardFoto = this._newElement.querySelector('.elements__mask-group');
    this._likesQuantity = this._newElement.querySelector('.elements__likes-quantity');
    this._deleteButton = this._newElement.querySelector('.elements__delete-button');
    this._likeButton = this._newElement.querySelector('.elements__button-like');
    this._openConfirmForm = openConfirmForm;
  }

  _getTemplate = () => {
    return this._elementForm.cloneNode(true);
  }

  changeLikesQuantity(cardData) {
    this._likeButton.classList.toggle('elements__button-like_active');
    this._likesQuantity.textContent = cardData.likes.length;    
  }

  deleteCard() {
    this._newElement.remove();   
  }

  _setEventlisteners = () => {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('elements__button-like_active') === true) {
        this._removeLikeCard(this); 
      }
      else {
        this._addLikeCard(this); 
      }
    });
    this._deleteButton.addEventListener('click', () => { 
      this._openConfirmForm(this, this._cardData);
    }); 
    this._cardFoto.addEventListener('click', () => {
     this._handleCardClick(this._fotoName, this._imageURL);
    });
  }

  createCard = () => {
    if (this._cardOwnerId != this._userId) {
      this._deleteButton.classList.add('elements__delete-button_hidden');
    }
    this._likeArray.forEach(element => {
      if (element._id === this._userId) {
        this._likeButton.classList.add('elements__button-like_active');
      }
    });
    this._cardName.textContent = this._fotoName;
    this._cardFoto.src = this._imageURL;
    this._cardFoto.alt = this._fotoName;
    this._likesQuantity.textContent = this._likeArray.length;
    this._setEventlisteners();
    return this._newElement;
  }
}