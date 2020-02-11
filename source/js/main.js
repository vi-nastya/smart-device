'use strict';

var userName = '';
var phone = '';
var text = '';

var nameInputContact = document.querySelectorAll('.contact-form input')[0];
var phoneInputContact = document.querySelectorAll('.contact-form input')[1];
var textInputContact = document.querySelector('.contact-form textarea');

var nameInputPopup = document.querySelectorAll('.popup-form input')[0];
var phoneInputPopup = document.querySelectorAll('.popup-form input')[1];
var textInputPopup = document.querySelector('.popup-form textarea');

var getStoredValues = function () {
  userName = localStorage.getItem('userName') || '';
  phone = localStorage.getItem('phone') || '';
  text = localStorage.getItem('text') || '';
};

var setValues = function () {
  localStorage.setItem('userName', userName);
  localStorage.setItem('phone', phone);
  localStorage.setItem('text', text);
};

var updateContactFormValues = function () {
  if (userName) {
    nameInputContact.value = userName;
  }

  if (phone) {
    phoneInputContact.value = phone;
  }

  if (text) {
    textInputContact.value = text;
  }
};

var updatePopupValues = function () {
  if (userName) {
    nameInputPopup.value = userName;
  }

  if (phone) {
    phoneInputPopup.value = phone;
  }

  if (text) {
    textInputPopup.value = text;
  }
};

var onFormSubmit = function (formElement) {
  userName = formElement.querySelectorAll('input')[0].value;
  phone = formElement.querySelectorAll('input')[1].value;
  text = formElement.querySelector('textarea').value;

  setValues();
};

getStoredValues();
updateContactFormValues();

var contactForm = document.querySelector('.contact-form');
var formSubmitButton = document.querySelector('.contact-form__button');

if (formSubmitButton && contactForm) {
  formSubmitButton.addEventListener('click', function () {
    onFormSubmit(contactForm);
  });
}

var popupOpenButton = document.querySelector('.page-header__call-me');
var popup = document.querySelector('.popup');
if (popup) {
  var bodyElement = document.querySelector('body');
  var closePopupButton = popup.querySelector('.popup-close');
  var popupSubmitButton = popup.querySelector('.popup-form__button');

  var closePopup = function () {
    popup.classList.add('popup--closed');
    bodyElement.classList.remove('overlay');

    bodyElement.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onEscKeyDown);
    closePopupButton.removeEventListener('click', closePopup);
  };

  var showPopup = function () {
    updatePopupValues();
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
    //bodyElement.addEventListener('click', onOverlayClick);
    //document.addEventListener('keydown', onEscKeyDown);
    closePopupButton.addEventListener('click', closePopup);
    popupSubmitButton.addEventListener('click', function () {
      onFormSubmit(popup);
    });
  });
}

// МАСКА ВВОДА
var contactPhoneInput = document.getElementById('contact-phone');
var modalPhoneInput = document.getElementById('modal-phone');

var maskOptions = {
  mask: '+7(000)000-00-00'
};

if (contactPhoneInput) {
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
}

if (modalPhoneInput) {
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
}

// АККОРДЕОН
var navButton = document.querySelectorAll('.accordion-btn')[0];
var contactsButton = document.querySelectorAll('.accordion-btn')[1];
var navList = document.querySelector('.page-footer__nav-columns');
var contactsList = document.querySelector('.page-footer__contacts-list');

if (navButton && contactPhoneInput && navList && contactsList) {
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
}

// ПЛАВНЫЙ СКРОЛЛ
var contactLink = document.querySelector('.intro__button');
var featuresLink = document.querySelector('.intro__features-link');
var contactSection = document.querySelector('#contact');
var featuresSection = document.querySelector('#features');

if (featuresLink && featuresSection) {
  featuresLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    featuresSection.scrollIntoView({behavior: 'smooth'});
  });
}

if (contactLink && contactSection) {
  contactLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    contactSection.scrollIntoView({behavior: 'smooth'});
  });
}
