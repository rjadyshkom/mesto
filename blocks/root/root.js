const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');
const closeEditButton = document.querySelector('#close-edit');
const closeAddButton = document.querySelector('#close-add');
const closeLightboxButton = document.querySelector('.lightbox__button-close');
const lightbox = document.querySelector('.lightbox');
const popupName = document.querySelector('.popup__name');
const popupAbout = document.querySelector('.popup__about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const elementsContainer = document.querySelector('.elements__inner');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');

function createCard(cardData) {
    const template = document.querySelector('#element-template').content;
    const element = template.querySelector('.element').cloneNode(true);
    const image = template.querySelector('.element__image');
    const title = template.querySelector('.element__title');

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    elementTrash(element);
    elementLike(element);
    lightboxOpen(element);

    return element;
}


function elementTrash(event) {
    const buttonTrash = event.querySelector('.button_type_trash');
    buttonTrash.addEventListener('click', function () {
        event.remove()
        return event;
    });
}

function elementLike(event) {
    const buttonLike = event.querySelector('.button_type_like');
    buttonLike.addEventListener('click', function (event) {
        event.target.classList.toggle('button_type_like_active');
        return event;
    });
}

function lightboxOpen() {

}

function openPopupEdit() {
    popupEdit.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
}

function openPopupAdd() {
    popupAdd.classList.add('popup_opened');
}

function closePopupEdit() {
    popupEdit.classList.remove('popup_opened');
}

function closePopupAdd() {
    popupAdd.classList.remove('popup_opened');
}


function openLightbox() {
    lightbox.classList.add('lightbox_opened');
}

function closeLightbox() {
    lightbox.classList.remove('lightbox_opened');
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopupEdit();
}

function formSubmitAddCard(evt) {
    evt.preventDefault();

    elementsContainer.prepend();
    closePopupAdd();
}


editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

closeEditButton.addEventListener('click', closePopupEdit);
closeAddButton.addEventListener('click', closePopupAdd);
closeLightboxButton.addEventListener('click', closeLightbox);

popupEdit.addEventListener('submit', formSubmitHandler);
popupAdd.addEventListener('submit', formSubmitAddCard);

const initialCards = [
    {
        name: 'Франция',
        link: './images/elements-france.jpg'
    },
    {
        name: 'Исландия',
        link: './images/elements-iceland.jpg'
    },
    {
        name: 'Швейцария',
        link: './images/elements-switzerland.jpg'
    },
    {
        name: 'Великобритания',
        link: './images/elements-united-kingdom.jpg'
    },
    {
        name: 'США',
        link: './images/elements-usa.jpg'
    },
    {
        name: 'Новая Зеландия',
        link: './images/elements-new-zealand.jpg'
    }
];

initialCards.forEach(cardData => {
    const card = createCard(cardData);
    elementsContainer.append(card);
});