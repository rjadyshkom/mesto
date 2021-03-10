let editButton = document.querySelector('.button_type_edit');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupName = document.querySelector('.popup__name');
let popupAbout = document.querySelector('.popup__about');
let formElement = popup.querySelector('.popup__form');
let closeButton = document.querySelector('.button_type_close');

function openPopup() {
    popup.classList.add('popup_type_opened');
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
}

function closePopup() {
    popup.classList.remove('popup_type_opened');
    popupName.value = '';
    popupAbout.value = '';
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);