const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');
const closeButton = document.querySelector('.button_type_close');
const closeLightboxButton = document.querySelector('.lightbox__button-close');
const popup = document.querySelector('.popup');
const lightbox = document.querySelector('.lightbox');
const popupTitle = document.querySelector('.popup__title');
const popupName = document.querySelector('.popup__name');
const popupAbout = document.querySelector('.popup__about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formElement = popup.querySelector('.popup__form');
const elementsContainer = document.querySelector('.elements__inner');
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


initialCards.forEach(element => {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = element.link;
    cardElement.querySelector('.element__image').alt = element.name;
    cardElement.querySelector('.element__title').textContent = element.name;

    cardElement.querySelector('.button_type_trash').addEventListener('click', () => {
        cardElement.remove();
    });


    cardElement.querySelector('.button_type_like').addEventListener('click', evt => {
        evt.target.classList.toggle('button_type_like_active');
    });

    cardElement.querySelector('.element__image').addEventListener('click', () => {
        openLightbox();
        document.querySelector('.lightbox__image').src = element.link;
        document.querySelector('.lightbox__caption').textContent = element.name;
    })

    elementsContainer.append(cardElement);
});


function openPopup() {
    popup.classList.add('popup_opened');
    popupTitle.textContent = 'Редактировать профиль';
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
    formElement.setAttribute('data', 'editForm');
}

function closePopup() {
    popup.classList.remove('popup_opened');
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
    closePopup();
}

function formSubmitAddCard(evt) {
    evt.preventDefault();
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = popupAbout.value;
    cardElement.querySelector('.element__title').textContent = popupName.value;
    cardElement.querySelector('.button_type_trash').addEventListener('click', () => {
        cardElement.remove();
    });
    cardElement.querySelector('.button_type_like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('button_type_like_active');
    });
    elementsContainer.prepend(cardElement);
    closePopup();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
closeLightboxButton.addEventListener('click', closeLightbox);

addButton.addEventListener('click', () => {
    openPopup();
    popupTitle.textContent = 'Новое место';
    popupName.value = 'Название';
    popupAbout.value = 'Ссылка на картинку';
    formElement.setAttribute('data', 'addForm');
});


formElement.addEventListener('submit', e => {
        const formDataAttribute = formElement.getAttribute('data')
        if (formDataAttribute === 'editForm') {
            return formSubmitHandler(e);
        } else {
            return formSubmitAddCard(e);
        }
    }
);