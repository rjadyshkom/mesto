export default class Card {
    constructor(data, cardSelector, handleCardClick, handleCardTrash, handleCardLike, myId) {
        this.data = data;
        this._cardImage = data.link;
        this._cardTitle = data.name;
        this._cardAuthor = data.owner;
        this._likes = data.likes;
        this._likesAmount = data.likes.length;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardTrash = handleCardTrash;
        this.handleCardLike = handleCardLike;
        this._myId = myId;
        console.log(this._myId)
    };

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    };

    _setEventListeners = () => {
        this._likeButton.addEventListener('click', () => {
            this.handleCardLike(this, this._likeButton.classList.contains('element__like_active'));
        });

        this._trashButton.addEventListener('click', () => {
            this._handleCardTrash();
        });

        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this.data);
        });
    };

    generateCard = () => {
        this._element = this._getTemplate();
        this._titleElement = this._element.querySelector('.element__title');
        this._imageElement = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like');
        this._counterContainer = this._element.querySelector('.element__counter')
        this._trashButton = this._element.querySelector('.element__trash');
        this._imageElement.src = this._cardImage;
        this._imageElement.alt = this._cardTitle;
        this._titleElement.textContent = this._cardTitle;
        this._counterContainer.textContent = this._likesAmount;

        if (this._myId === this._cardAuthor._id) {
            this._trashButton.classList.add('element__trash_visible');
        }

        if (this._likes.some(likeAuthor => likeAuthor._id === this._myId)) {
            this._likeButton.classList.add('element__like_active');
        }

        this._setEventListeners();

        return this._element;
    };

    handleTrashCard() {
        this._element.remove();
        this._element = null;
    };

    toggleLike() {
        this._likeButton.classList.toggle('element__like_active');
    };

    likeAddition() {
        this._counterContainer.textContent = this._likesAmount += 1;
        this.toggleLike();
    };

    likeSubtraction() {
        this._counterContainer.textContent = this._likesAmount -= 1;
        this.toggleLike();
    };
}