import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    };

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
        });
    };

    trashAfterSubmit(trashCard) {
        this._submit = trashCard;
    };
}