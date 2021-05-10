import {cardData} from './cardData.js'
import {buttonAdd, buttonEdit, formAdd, formConfig, formEdit, profileConfig} from "./constants.js";
import Section from "./Section.js";
import Card from './Card.js'
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";

const validationEdit = new FormValidator(formConfig, formEdit);
const validationAdd = new FormValidator(formConfig, formAdd);
const lightbox = new PopupWithImage('.lightbox');

const defaultCards = new Section({
    items: cardData,
    renderer: items => {
        const newCard = new Card(
            items,
            '#element-template',
            lightbox.open
        );

        defaultCards.addItem(newCard.generateCard());
    }
}, '.elements__inner');
defaultCards.renderItems();

const editProfile = new UserInfo('.profile__name', '.profile__about', profileConfig);

const editProfilePopup = new PopupWithForm('.popup_type_edit', items => {
    const item = {name: items.name, about: items.about};
    editProfile.setUserInfo(item.name, item.about);
    editProfilePopup.close();
    validationEdit.toggleButtonState();
});

const addCardPopup = new PopupWithForm('.popup_type_add', items => {
    items.name = items.title;
    delete items.title;
    defaultCards.renderer(items);
    addCardPopup.close();
    validationAdd.toggleButtonState();
});

lightbox.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

buttonEdit.addEventListener('click', () => editProfilePopup.open(editProfile.setInputValues()));
buttonAdd.addEventListener('click', () => addCardPopup.open());

validationEdit.enableFormsValidation();
validationAdd.enableFormsValidation();