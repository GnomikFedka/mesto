let likes = document.querySelectorAll('.elements__like');
let typeoflikes = document.querySelectorAll('.elements__button-like');
let edit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closed = document.querySelector('.popup__close-button');
let named = document.querySelector('.profile__name');
let fieldofactivity = document.querySelector('.profile__field-of-activity');
let inputname = document.querySelector('.popup__input_name');
let inputfieldofactivity = document.querySelector('.popup__input_field-of-activity');
let input = document.querySelector('.popup__input');
let saved = document.querySelector('.popup__button-save');
let page = document.querySelector('.page');
let plus = document.querySelector('.profile__add-button');
let i = 0;

for (i = 0; i <= likes.length - 1; i++) {
  (function (i) {
    typeoflikes[i].addEventListener('click', function () {
      if (likes[i].src.charAt(likes[i].src.length - 9) === '/') {
        likes[i].setAttribute('src', 'images/darklike.svg');
      }
      else likes[i].setAttribute('src', 'images/like.svg');
    })
  })(i);
}

edit.addEventListener('click', visual);
function visual() {
  inputname.value = named.innerText;
  inputfieldofactivity.value = fieldofactivity.innerText;
  popup.classList.add('popup_opened');
  edit.setAttribute('disabled', 'disabled');
  for (i = 0; i <= likes.length - 1; i++) {
    typeoflikes[i].setAttribute('disabled', 'disabled');
  }
  plus.setAttribute('disabled', 'disabled');
}

closed.addEventListener('click', unvisual);
function unvisual() {
  popup.classList.remove('popup_opened');
  edit.removeAttribute('disabled');
  for (i = 0; i <= likes.length - 1; i++) {
    typeoflikes[i].removeAttribute('disabled');
  }
  plus.removeAttribute('disabled');
}

saved.addEventListener('click', saving);
function saving() {
  named.innerText = inputname.value;
  fieldofactivity.innerText = inputfieldofactivity.value;
  popup.classList.remove('popup_opened');
  edit.removeAttribute('disabled');
  for (i = 0; i <= likes.length - 1; i++) {
    typeoflikes[i].removeAttribute('disabled');
  }
  plus.removeAttribute('disabled');
}

document.addEventListener('keyup', savingenter);

function savingenter(event) {
  if (event.key === 'Enter') {
    if (popup.classList.contains('popup_opened') === true) {
      named.innerText = inputname.value;
      fieldofactivity.innerText = inputfieldofactivity.value;
      popup.classList.remove('popup_opened');
      edit.removeAttribute('disabled');
      for (i = 0; i <= likes.length - 1; i++) {
        typeoflikes[i].removeAttribute('disabled');
      }
      plus.removeAttribute('disabled');
    }
  }
}