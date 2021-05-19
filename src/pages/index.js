import './index.css';
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
import PopupWithConfirm from "../components/popupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

let cardsHandler = {};

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24/',
    headers: {
        authorization: '5fd23566-2009-4168-810a-09e25b9f3483',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, userCard]) => {
        handleUserInfo(userData);
        handleUserCards(userCard)
    })
    .catch((err) => {
        console.log(`Вот, что произошло. ${err}`);
    });


const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');
const validationEdit = new FormValidator(formConfig, formEdit);
const validationAdd = new FormValidator(formConfig, formAdd);
const validationAvatar = new FormValidator(formConfig, formAvatar);
const lightbox = new PopupWithImage('.lightbox');
const confirm = new PopupWithConfirm('.popup_type_confirm-trash');

const avatarEdit = new PopupWithForm('.popup_type_edit-avatar', data => {
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

const profileEdit = new UserInfo('.profile__name', '.profile__about');

const profileEditPopup = new PopupWithForm('.popup_type_edit', values => {
    profileEditPopup.showSavingText(true);

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
    cardAddPopup.showSavingText(true);

    function handleAddingCard(item) {
        const card = createCard(item);
        cardsHandler.addItem(card.generateCard());
    }

    api.uploadNewCard(items).then((res) => handleAddingCard(res)).catch((err) => {
        console.log(err)
    }).finally(() => {
        cardAddPopup.showSavingText(false);
        validationAdd.toggleButtonState();
    });
});

function handleUserInfo(data) {
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data.avatar);
}

function createCard(item) {
    const newCard = new Card(item, '#element-template', lightbox.open, (confirmTrash) => {
        confirm.trashAfterSubmit(() => {
            api.trashCard(item._id)
                .then(res => {
                    newCard.handleTrashCard();
                    confirm.close();
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        confirm.open(confirmTrash);
    }, (item, isLiked) => {
        if (isLiked) {
            api.removeLike(item.data._id)
                .then((res) => newCard.likeSubtraction(res))
                .catch((err) => {
                    console.log(err)
                });
        } else {
            api.setLike(item.data._id)
                .then((res) => newCard.likeAddition(res))
                .catch((err) => {
                    console.log(err)
                });
        }
    });

    return newCard;
}

function handleUserCards(userCardsData) {
    cardsHandler = new Section({
        items: userCardsData,
        renderer: (item) => {
            const card = createCard(item);
            cardsHandler.addItem(card.generateCard());
        }
    }, '.elements__inner');
    cardsHandler.renderItems();
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
confirm.setEventListeners();

validationEdit.enableFormsValidation();
validationAdd.enableFormsValidation();
validationAvatar.enableFormsValidation();