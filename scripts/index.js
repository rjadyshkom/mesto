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
const lightboxImage = lightbox.querySelector('.lightbox__image');
const lightboxCaption = lightbox.querySelector('.lightbox__caption');
const inputCaption = document.querySelector('#popup-add__caption');
const inputLink = document.querySelector('#popup-add__link');

function createCard(cardData) {
    const template = document.querySelector('#element-template').content;
    const element = template.querySelector('.element').cloneNode(true);
    const image = element.querySelector('.element__image');
    const title = element.querySelector('.element__title');
    const trash = element.querySelector('.button_type_trash');
    const like = element.querySelector('.button_type_like');

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    trash.addEventListener('click', (event) => {
        elementTrash(event);
    });

    like.addEventListener('click', (event) => {
        elementLike(event);
    });

    image.addEventListener('click', () => {
        openLightbox(cardData);
    });

    return element;
}

function formSubmitAddCard(event) {
    event.preventDefault();
    const cardData = {
        name: inputCaption.value,
        link: inputLink.value
    }
    elementsContainer.prepend(createCard(cardData));
    togglePopup(popupAdd);
}

function elementTrash(event) {
    event.target.closest('.element').remove();
    return event;
}

function elementLike(event) {
    event.target.classList.toggle('button_type_like_active');
    return event;
}

function togglePopup(popup) {
    popup.classList.toggle('popup_opened')
}

function openPopupEdit() {
    togglePopup(popupEdit);
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
}

function closePopupEdit() {
    togglePopup(popupEdit);
    popupName.value = '';
    popupAbout.value = '';
}

function openPopupAdd() {
    togglePopup(popupAdd);
}

function closePopupAdd() {
    togglePopup(popupAdd);
}

function openLightbox(cardData) {
    togglePopup(lightbox)
    lightboxImage.src = cardData.link;
    lightboxImage.alt = cardData.name;
    lightboxCaption.textContent = cardData.name;
}

function closeLightbox() {
    togglePopup(lightbox);
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    togglePopup(popupEdit);
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