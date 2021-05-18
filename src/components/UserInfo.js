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

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;
    };

    setUserAvatar(link) {
        this._userAvatar.src = link;
    };
}