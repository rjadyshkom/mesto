const editButton = document.querySelector('.button_type_edit');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupName = document.querySelector('.popup_name');
const popupAbout = document.querySelector('.popup_about');
const formElement = popup.querySelector('.popup__form');
const closeButton = document.querySelector('.button_type_close');

function openPopup() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.innerText;
    popupAbout.value = profileAbout.innerText;
}

function closePopup() {
    popup.classList.remove('popup_opened');
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