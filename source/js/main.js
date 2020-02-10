'use strict';
var popupOpenButton = document.querySelector('.page-header__call-me');
var popup = document.querySelector('.popup');
var bodyElement = document.querySelector('body');
var closePopupButton = popup.querySelector('.popup-close');

var closePopup = function () {
  popup.classList.add('popup--closed');
  bodyElement.classList.remove('overlay');

  bodyElement.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onEscKeyDown);
  closePopupButton.removeEventListener('click', closePopup);
};

var showPopup = function () {
  popup.classList.remove('popup--closed');
  bodyElement.classList.add('overlay');
};

var onEscKeyDown = function (evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
};

var onOverlayClick = function (evt) {
  if (!popup.contains(evt.target) && evt.target !== popupOpenButton) {
    closePopup();
  }
};

popupOpenButton.addEventListener('click', function () {
  showPopup();

  // при открытии модального окна фокус в поле "Имя"
  var popupNameInput = popup.querySelectorAll('.popup-form input')[0];
  popupNameInput.focus();

  // закрытие при клике на overlay, при клике на кнопку "закрыть" и по Esc
  bodyElement.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscKeyDown);
  closePopupButton.addEventListener('click', closePopup);
});

// TODO: значения полей "Имя", "Телефон" и "Ваше сообщение" должны храниться в localStorage

// МАСКА ВВОДА
var contactPhoneInput = document.getElementById('contact-phone');
var modalPhoneInput = document.getElementById('modal-phone');

var maskOptions = {
  mask: '+7(000)000-00-00'
};

var contactMask = IMask(contactPhoneInput, maskOptions);
contactPhoneInput.addEventListener('focus', function () {
  if (contactMask.value === '') {
    contactMask.value = '+7(';
  }
});

contactPhoneInput.addEventListener('blur', function () {
  if (contactMask.value === '+7(') {
    contactMask.value = '';
  }
});

var modalMask = IMask(modalPhoneInput, maskOptions);
modalPhoneInput.addEventListener('focus', function () {
  if (modalMask.value === '') {
    modalMask.value = '+7(';
  }
});

modalPhoneInput.addEventListener('blur', function () {
  if (modalMask.value === '+7(') {
    modalMask.value = '';
  }
});

// TODO: значения полей "Имя", "Телефон" и "Ваше сообщение" должны храниться в localStorage


// ACCORDION
var navButton = document.querySelectorAll('.accordion-btn')[0];
var contactsButton = document.querySelectorAll('.accordion-btn')[1];
var navList = document.querySelector('.page-footer__nav-columns');
var contactsList = document.querySelector('.page-footer__contacts-list');

var sections = [{
  button: navButton,
  content: navList
}, {
  button: contactsButton,
  content: contactsList
}];

var hideSections = function () {
  sections.forEach(function (section) {
    section.button.classList.remove('accordion-btn--close');
    section.content.classList.add('accordion-hide');
  });
};

var showSection = function (section) {
  // todo
};

sections.forEach(function (section) {
  section.button.addEventListener('click', function () {
    var isSectionShown = section.button.classList.contains('accordion-btn--close');
    hideSections();

    // if current section was closed, show it
    if (!isSectionShown) {
      section.button.classList.add('accordion-btn--close');
      section.content.classList.remove('accordion-hide');
    }
  });
});
