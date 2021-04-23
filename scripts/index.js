import {cardData} from './cardData.js'
import Card from './Card.js'
import FormValidator from "./FormValidator.js";

const popupsArray = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const closeEditButton = document.querySelector('#close-edit');
const closeAddButton = document.querySelector('#close-add');
const popupName = document.querySelector('.popup__name');
const popupAbout = document.querySelector('.popup__about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const elementsContainer = document.querySelector('.elements__inner');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const inputCaption = document.querySelector('#title-popup');
const inputLink = document.querySelector('#link-popup');
const editForm = document.querySelector('#editForm');
const addForm = document.querySelector('#addForm');

export const lightbox = document.querySelector('.lightbox');
export const lightboxImage = document.querySelector('.lightbox__image');
export const closeLightboxButton = document.querySelector('.lightbox__button-close');
export const lightboxCaption = document.querySelector('.lightbox__caption');

const formConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text-field',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__text-field_type_error',
    errorClass: 'popup__error_visible'
};

const validationEdit = new FormValidator(formConfig, editForm);
validationEdit.enableFormsValidation();

const validationAdd = new FormValidator(formConfig, addForm);
validationAdd.enableFormsValidation();

function handleCardFormSubmit(event) {
    event.preventDefault();
    const card = {};
    card.name = inputCaption.value;
    card.link = inputLink.value;
    const addCard = new Card(card, '#element-template')
    elementsContainer.prepend(addCard.generateCard());
    closePopup(popupAdd);
    event.target.reset();
}

export const closePopupByEsc = function (evt) {
    if (evt.key === 'Escape') {
        const selectPopup = document.querySelector('.popup_opened');
        closePopup(selectPopup);
    }
};

popupsArray.forEach(element => {
    element.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(element);
        }
    });
});

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

function openPopupEdit() {
    openPopup(popupEdit);
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
}

function closePopupEdit() {
    closePopup(popupEdit);
    popupName.value = '';
    popupAbout.value = '';
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup(popupEdit);
}

editButton.addEventListener('click', () => openPopupEdit(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAdd));

closeEditButton.addEventListener('click', () => closePopupEdit(popupEdit));
closeAddButton.addEventListener('click', () => closePopup(popupAdd));

popupEdit.addEventListener('submit', handleProfileFormSubmit);
popupAdd.addEventListener('submit', handleCardFormSubmit);

cardData.forEach((item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.generateCard();
    document.querySelector('.elements__inner').append(cardElement);
});