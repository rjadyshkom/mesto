export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    };

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    };

    _handleOverlayClose(event) {
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    };

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    setEventListeners = () => {
        this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
        this._popup.addEventListener('click', this._handleOverlayClose);
    };
}