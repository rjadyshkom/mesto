const popupsArray = document.querySelectorAll('.popup');
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
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const lightboxImage = lightbox.querySelector('.lightbox__image');
const lightboxCaption = lightbox.querySelector('.lightbox__caption');
const inputCaption = document.querySelector('#title-popup');
const inputLink = document.querySelector('#link-popup');

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
    closePopup(popupAdd);
    inputCaption.value = '';
    inputLink.value = '';
}

function elementTrash(event) {
    event.target.closest('.element').remove();
    return event;
}

function elementLike(event) {
    event.target.classList.toggle('button_type_like_active');
    return event;
}

const closePopupByEsc = function (evt) {
    if (evt.key === 'Escape') {
        const selectPopup = document.querySelector('.popup_opened');
        closePopup(selectPopup);
    }
}

/* Способ не особо элегантный, так как попытка убрать несуществующий класс происходит при клике на любом элементе формы.
С другой стороны слушатель каждый раз снимается, поэтому для производительности без разницы  (если я все правильно понимаю).
Плюс не нужно в html добавлять дополнительный div для оверлея и закрывать окно только при клике на нём. */

popupsArray.forEach(element => {
    element.addEventListener('click', function (evt) {
        closePopup(evt.target);
        console.log(evt.target)
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

function openLightbox(cardData) {
    openPopup(lightbox)
    lightboxImage.src = cardData.link;
    lightboxImage.alt = cardData.name;
    lightboxCaption.textContent = cardData.name;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup(popupEdit);
}

editButton.addEventListener('click', () => openPopupEdit(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAdd));

closeEditButton.addEventListener('click', () => closePopupEdit(popupEdit));
closeAddButton.addEventListener('click', () => closePopup(popupAdd));
closeLightboxButton.addEventListener('click', () => closePopup(lightbox));

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