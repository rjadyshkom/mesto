import './index.css';
import {cardData} from '../utilities/cardData.js'
import {
    buttonAdd,
    buttonEdit,
    buttonEditAvatar,
    formAdd,
    formAvatar,
    formConfig,
    formEdit,
    profileConfig
} from "../utilities/constants.js";
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
const validationAvatar = new FormValidator(formConfig, formAvatar);
const lightbox = new PopupWithImage('.lightbox');

const avatarEdit = new PopupWithForm('.popup_type_edit-avatar', (data) => {
    avatarEdit.showSavingText(true);

    function handleLoadUserAvatar(item) {
        userInfo.setUserAvatar(item.avatar);
    }

    api.loadUserAvatar(data.avatarLink).then((res) => handleLoadUserAvatar(res)).catch((err) => {
        console.log(err)
    }).finally(() => {
        avatarEdit.showSavingText(false);
        validationAvatar.toggleButtonState();
    });
});


const defaultCards = new Section({
    items: cardData,
    renderer: items => {
        const card = createCard(items);
        defaultCards.addItem(card);
    }
}, '.elements__inner');

defaultCards.renderItems();

const profileEdit = new UserInfo('.profile__name', '.profile__about');

const profileEditPopup = new PopupWithForm('.popup_type_edit', (values) => {

    function HandleSetUserInfo(data) {
        userInfo.setUserInfo(data);
    }

    api.setUserInfo(values).then((res) => HandleSetUserInfo(res)).catch((err) => {
        console.log(err);
    }).finally(() => {
        profileEditPopup.showSavingText(false);
        validationEdit.toggleButtonState();
    });
});

const cardAddPopup = new PopupWithForm('.popup_type_add', items => {
    items.name = items.title;
    delete items.title;
    defaultCards.renderer(items);
    cardAddPopup.close();
    validationAdd.toggleButtonState();
});

function handleUserInfo(data) {
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

buttonEdit.addEventListener('click', () => {
    const userData = profileEdit.getUserInfo();
    profileConfig.name.value = userData.name;
    profileConfig.about.value = userData.about;
    profileEditPopup.open();
});

buttonAdd.addEventListener('click', () => cardAddPopup.open());
buttonEditAvatar.addEventListener('click', () => avatarEdit.open());

lightbox.setEventListeners();
profileEditPopup.setEventListeners();
cardAddPopup.setEventListeners();
avatarEdit.setEventListeners();

validationEdit.enableFormsValidation();
validationAdd.enableFormsValidation();
validationAvatar.enableFormsValidation();