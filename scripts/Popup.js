export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._rootContainer = document.querySelector('.root');
    };

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    };

    _handleOverlayClose = (event) => {
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    };

    _enableScroll() {
        this._rootContainer.removeAttribute('style');
    };

    _disableScroll() {
        const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
        this._rootContainer.style.overflow = 'hidden';
        this._rootContainer.style.paddingRight = `${scrollbarWidth}px`;
    };


    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._disableScroll();
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._enableScroll();
    };

    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
        this._popup.addEventListener('click', this._handleOverlayClose);
    };
}