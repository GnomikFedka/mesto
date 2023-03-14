import {
    researcherName,
    activityField
} from '../utils/constants.js';
export class UserInfo {
    constructor () {
    }
    getUserInfo (inputs) {
        inputs[0].value = researcherName.textContent;
        inputs[1].value = activityField.textContent;
    }
    setUserInfo (inputs) {
        researcherName.textContent = inputs[0].value;
        activityField.textContent = inputs[1].value;
    }
}