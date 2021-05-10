export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._cardImage = data.link;
        this._cardTitle = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this.data = data;
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

    _setEventListeners = () => {
        this._element.querySelector('.element__like').addEventListener('click', () => this._handleLikeCard());
        this._element.querySelector('.element__trash').addEventListener('click', () => this._handleTrashCard());
        this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this.data));
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