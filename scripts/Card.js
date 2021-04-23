import {closeLightboxButton, closePopupByEsc, lightbox, lightboxCaption, lightboxImage} from "./index.js";

export default class Card {
    constructor(data, cardSelector) {
        this._cardImage = data.link;
        this._cardTitle = data.name;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _handleLikeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleTrashCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeCard();
        });

        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleTrashCard();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenLightbox();
        });

        closeLightboxButton.addEventListener('click', () => {
            this._handleCloseLightbox();
        })
    }

    _handleOpenLightbox() {
        lightboxImage.src = this._cardImage;
        lightboxCaption.textContent = this._cardTitle;
        lightbox.classList.add('popup_opened');
        document.addEventListener('keydown', closePopupByEsc);
    }

    _handleCloseLightbox() {
        lightbox.classList.remove('popup_opened');
        document.removeEventListener('keydown', closePopupByEsc);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._cardImage;
        this._element.querySelector('.element__image').alt = this._cardTitle;
        this._element.querySelector('.element__title').textContent = this._cardTitle;
        return this._element;
    }
}