export const buttonEdit = document.querySelector('.profile__edit');
export const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
export const buttonAdd = document.querySelector('.profile__add');
export const formEdit = document.querySelector('#editForm');
export const formAdd = document.querySelector('#addForm');
export const formAvatar = document.querySelector('#editAvatarForm');

export const formConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text-field',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__text-field_type_error',
    errorClass: 'popup__error_visible'
};

export const profileConfig = {
    name: document.querySelector('.popup__name'),
    about: document.querySelector('.popup__about')
}