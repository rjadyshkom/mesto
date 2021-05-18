import './index.css';
import {cardData} from '../utilities/cardData.js'
import {buttonAdd, buttonEdit, formAdd, formConfig, formEdit, profileConfig} from "../utilities/constants.js";
import Section from "../components/Section.js";
import Card from '../components/Card.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24/',
    headers: {
        authorization: '5fd23566-2009-4168-810a-09e25b9f3483',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfo()])
    .then(([userData]) => {
        handleUserInfo(userData);
    })
    .catch((err) => {
        console.log(err);
    });

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');
const validationEdit = new FormValidator(formConfig, formEdit);
const validationAdd = new FormValidator(formConfig, formAdd);
const lightbox = new PopupWithImage('.lightbox');

function handleUserInfo(data) {
    console.log(data)
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data.avatar);
}

function createCard(items) {
    const newCard = new Card(
        items,
        '#element-template',
        lightbox.open
    );
    return newCard.generateCard();
}

const defaultCards = new Section({
    items: cardData,
    renderer: items => {
        const card = createCard(items);
        defaultCards.addItem(card);
    }
}, '.elements__inner');

defaultCards.renderItems();

const editProfile = new UserInfo('.profile__name', '.profile__about');

const editProfilePopup = new PopupWithForm('.popup_type_edit', (values) => {

    function HandleUserInfoSet(data) {
        userInfo.setUserInfo(data);
    }

    api.setUserInfo(values).then((res) => HandleUserInfoSet(res)).catch((err) => {
        console.log(err);
    }).finally(() => {
        editProfilePopup.showSavingText(false);
        validationEdit.toggleButtonState();
    });
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

buttonEdit.addEventListener('click', () => {
    const userData = editProfile.getUserInfo();
    profileConfig.name.value = userData.name;
    profileConfig.about.value = userData.about;
    editProfilePopup.open();
});
buttonAdd.addEventListener('click', () => addCardPopup.open());

validationEdit.enableFormsValidation();
validationAdd.enableFormsValidation();