let likes = document.querySelectorAll('.elements__like');
let typeoflikes = document.querySelectorAll('.elements__button-like');
let edit = document.querySelector('.profile__edit-button');
let form = document.querySelector('.form');
let closed = document.querySelector('.form__close-button');
let named = document.querySelector('.profile__name');
let fieldofactiviry = document.querySelector('.profile__field-of-activity');
let inputname = document.querySelector('.form__input-name');
let inputfieldofactiviry = document.querySelector('.form__input-field-of-activity');
let saved = document.querySelector('.form__button-save');
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
  form.setAttribute('style', 'display: flex');
  inputname.value = named.innerText;
  inputfieldofactiviry.value = fieldofactiviry.innerText;
  page.setAttribute('style', 'opacity: 0.5');
  edit.setAttribute('disabled', 'disabled');
  for (i = 0; i <= likes.length - 1; i++) {
    typeoflikes[i].setAttribute('disabled', 'disabled');
  }
  plus.setAttribute('disabled', 'disabled');
}

closed.addEventListener('click', unvisual);
function unvisual() {
  form.setAttribute('style', 'display: none');
  page.setAttribute('style', 'opacity: 1');
  edit.removeAttribute('disabled');
  for (i = 0; i <= likes.length - 1; i++) {
    typeoflikes[i].removeAttribute('disabled');
  }
  plus.removeAttribute('disabled');
}

saved.addEventListener('click', saving);
function saving() {
  form.setAttribute('style', 'display: none');
  named.innerText = inputname.value;
  fieldofactiviry.innerText = inputfieldofactiviry.value;
  page.setAttribute('style', 'opacity: 1');
  edit.removeAttribute('disabled');
  for (i = 0; i <= likes.length - 1; i++) {
    typeoflikes[i].removeAttribute('disabled');
  }
  plus.removeAttribute('disabled');
}

document.addEventListener('keyup', savingenter);

function savingenter(event) {
  if (event.key === 'Enter') {
    if (form.getAttribute('style', 'display') === 'display: flex') {
      form.setAttribute('style', 'display: none');
      named.innerText = inputname.value;
      fieldofactiviry.innerText = inputfieldofactiviry.value;
      page.setAttribute('style', 'opacity: 1');
      edit.removeAttribute('disabled');
      for (i = 0; i <= likes.length - 1; i++) {
        typeoflikes[i].removeAttribute('disabled');
      }
      plus.removeAttribute('disabled');
    }
  }
}