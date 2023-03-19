export class UserInfo {
    constructor (popup) {
      this._popup = popup;
      this._inputs = document.querySelector(this._popup).querySelectorAll('input');
      this._researcherName = document.querySelector('.profile__name');
      this._activityField = document.querySelector('.profile__field-of-activity');
    }
    getUserInfo () {
        this._inputs[0].value = this._researcherName.textContent;
        this._inputs[1].value = this._activityField.textContent;
    }
    setUserInfo () {
        this._researcherName.textContent = this._inputs[0].value;
        this._activityField.textContent = this._inputs[1].value;
    }
}