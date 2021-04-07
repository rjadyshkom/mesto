const popupsArray = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
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
    const trash = element.querySelector('.element__trash');
    const like = element.querySelector('.element__like');

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    trash.addEventListener('click', (event) => {
        trashElement(event);
    });

    like.addEventListener('click', (event) => {
        likeElement(event);
    });

    image.addEventListener('click', () => {
        openLightbox(cardData);
    });

    return element;
}

function handleCardFormSubmit(event) {
    event.preventDefault();
    const cardData = {
        name: inputCaption.value,
        link: inputLink.value
    }
    elementsContainer.prepend(createCard(cardData));
    closePopup(popupAdd);
    event.target.reset();
    enableFormsValidation(); // не додумался, какие аргументы нужно передать в toggleButtonState, чтобы заработало, поэтому сделал так.
}

function trashElement(event) {
    event.target.closest('.element').remove();
    return event;
}

function likeElement(event) {
    event.target.classList.toggle('element__like_active');
    return event;
}

const closePopupByEsc = function (evt) {
    if (evt.key === 'Escape') {
        const selectPopup = document.querySelector('.popup_opened');
        closePopup(selectPopup);
    }
};

popupsArray.forEach(element => {
    element.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(element);
        }
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

function handleProfileFormSubmit(evt) {
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

popupEdit.addEventListener('submit', handleProfileFormSubmit);
popupAdd.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(cardData => {
    const card = createCard(cardData);
    elementsContainer.append(card);
});