import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSelector = this._popup.querySelector('.popup__form');
        this.formSubmitHandler = formSubmitHandler;
    }

    _getInputValues() {
        const inputs = this._formSelector.getElementsByClassName('popup__text-field');
        const inputValues = {};
        Array.from(inputs).forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._formSelector.addEventListener('submit', evt => {
            evt.preventDefault();
            this.formSubmitHandler(this._getInputValues());
        });
    };

    close() {
        super.close();
        this._formSelector.reset();
    };
}