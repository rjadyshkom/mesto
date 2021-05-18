export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._cardImage = data.link;
        this._cardTitle = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this.data = data;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _handleLikeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleTrashCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click', () => this._handleLikeCard());
        this._trashButton.addEventListener('click', () => this._handleTrashCard());
        this._imageElement.addEventListener('click', () => this._handleCardClick(this.data));
    }

    generateCard = () => {
        this._element = this._getTemplate();
        this._titleElement = this._element.querySelector('.element__title');
        this._imageElement = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like');
        this._trashButton = this._element.querySelector('.element__trash');
        this._imageElement.src = this._cardImage;
        this._imageElement.alt = this._cardTitle;
        this._titleElement.textContent = this._cardTitle;
        this._setEventListeners();
        return this._element;
    }
}