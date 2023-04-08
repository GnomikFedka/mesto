export class UserInfo {
    constructor (researcherName, activityField, avatar) {
      this._researcherName = document.querySelector(researcherName);
      this._activityField = document.querySelector(activityField);
      this._avatar = document.querySelector(avatar);
    }

    setStartUserData (apiObjectData) {
        this._researcherName.textContent = apiObjectData.name;
        this._activityField.textContent = apiObjectData.about;
        this._avatar.src = apiObjectData.avatar;
    }

    setAvatarFoto(apiObjectData) {
        this._avatar.src = apiObjectData.avatar;
    }

    setNameAndActivityField(apiObjectData) {
        this._researcherName.textContent = apiObjectData.name;
        this._activityField.textContent = apiObjectData.about;
    }

    setAvatarInfo (inputValues) {
        return {
            avatar: inputValues.avatar
        }
    }

    getUserInfo () {
        return { 
            name: this._researcherName.textContent,
            about: this._activityField.textContent
        }
    }

    setUserInfo (inputValues) {
        return {
            name: inputValues.name,
            about: inputValues.about
        }
    }
}