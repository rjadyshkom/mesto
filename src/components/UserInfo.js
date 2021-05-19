export default class UserInfo {
    constructor(userName, userAbout, userAvatar) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
        this._userAvatar = document.querySelector(userAvatar);
    };

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        }
    };

    setUserInfo(userData) {
        this._userName.textContent = userData.name;
        this._userAbout.textContent = userData.about;
    };

    setUserAvatar(userLink) {
        this._userAvatar.src = userLink;
    };
}