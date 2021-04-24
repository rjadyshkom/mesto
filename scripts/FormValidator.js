export default class FormValidator {
    constructor(config, currentForm) {
        this._config = config;
        this._currentForm = currentForm;
        this._inputsArray = Array.from(this._currentForm.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._currentForm.querySelector(this._config.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._currentForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._currentForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        this.toggleButtonState();
        this._inputsArray.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }

    _hasInvalidInput() {
        return this._inputsArray.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    toggleButtonState() { // метод переехал в публичные, так как согласно комментарию, он вызывается в handleCardFormSubmit();
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.setAttribute('disabled', true);
        } else {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.removeAttribute('disabled');
        }
    }


    enableFormsValidation() {
        this._setEventListeners();
    }
}