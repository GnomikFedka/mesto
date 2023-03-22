export class UserInfo {
    constructor (researcherName, activityField) {
      this._researcherName = document.querySelector(researcherName);
      this._activityField = document.querySelector(activityField);
    }
    getUserInfo () {
        return { 
            name: this._researcherName.textContent,
            info: this._activityField.textContent
        }
    }
    setUserInfo (inputValues) {
        this._researcherName.textContent = inputValues.profileName;
        this._activityField.textContent = inputValues.fieldOfActivity;
    }
}