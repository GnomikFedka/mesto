export class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._saveButton = this._popup.querySelector('.popup__button-save');
      this._closeButton = this._popup.querySelector('.popup__container').querySelector('.popup__close-button');
      this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }

    changeButtonText(isLoading, buttonText) {
      if (isLoading) {
        this._saveButton.textContent = 'Сохранение...';
      } 
      else {
        this._saveButton.textContent = buttonText;
      }
    }

    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
    
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    setEventListeners() {
      this._popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
          this.close();
        }
      });
      this._closeButton.addEventListener('click', () => {
        this.close();
      });
    }
}