export class UserInfo {
    constructor () {
      this._researcherName = document.querySelector('.profile__name');
      this._activityField = document.querySelector('.profile__field-of-activity');
    }
    getUserInfo (userData) {
        userData.name = this._researcherName.textContent;
        userData.info = this._activityField.textContent;
    }
    setUserInfo (userData) {
        this._researcherName.textContent = userData.name;
        this._activityField.textContent = userData.info;
    }
}