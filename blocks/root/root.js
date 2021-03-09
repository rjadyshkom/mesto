let editButton = document.querySelector('.button_type_edit');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name').innerText;
let profileAbout = document.querySelector('.profile__about').innerText;
let popupName = document.querySelector('.popup_name');
let popupAbout = document.querySelector('.popup_about');

function openPopup() {
    popup.classList.add('popup_opened');
    popupName.value = profileName;
    popupAbout.value = profileAbout;
}

let closeButton = document.querySelector('.button_type_close');

function closePopup() {
    popup.classList.remove('popup_opened');
    popupName.value = '';
    popupAbout.value = '';
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


let formElement = popup.querySelector('.popup__form');

function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameInput = popup.querySelector('.popup_name').value;
    let jobInput = popup.querySelector('.popup_about').value;
    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__about');
    profileName.textContent = nameInput;
    profileAbout.textContent = jobInput;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);