export default class UserInfo {
    constructor(userName, userAbout, profileConfig) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
        this._profileConfig = profileConfig;
    };

    getUserInfo = () => {
        const userInfo = {};
        userInfo.name = this._userName.textContent;
        userInfo.about = this._userAbout.textContent;
        return userInfo;
    };

    setUserInfo(name, about) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    };

    setInputValues = () => {
        const newInputData = this.getUserInfo();
        this._profileConfig.name.value = newInputData.name;
        this._profileConfig.about.value = newInputData.about;
    };
}