import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._lightboxImage = this._popup.querySelector('.lightbox__image');
        this._lightboxCaption = this._popup.querySelector('.lightbox__caption');
    };

    open = (data) => {
        this._lightboxImage.src = data.link;
        this._lightboxImage.alt = data.name;
        this._lightboxCaption.textContent = data.name;
        super.open();
    };
}