'use strict';
var popupOpenButton = document.querySelector('.page-header__call-me');
var popup = document.querySelector('.popup');

popupOpenButton.addEventListener('click', function () {
  popup.classList.remove('popup--closed');

  var popupNameInput = popup.querySelector('.popup-form__input--name');
  // при открытии модального окна фокус в поле "Имя"
  popupNameInput.focus();

  var closePopupButton = popup.querySelector('.popup-close');
  closePopupButton.addEventListener('click', function () {
    popup.classList.add('popup--closed');
  });
});

// TODO: закрытие модального окна по кнопке "Х" [x],  по нажатию клавиши Esc [], по клику на overlay[].
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

var modalMask = IMask(modalPhoneInput, maskOptions);
modalPhoneInput.addEventListener('focus', function () {
  if (modalMask.value === '') {
    modalMask.value = '+7(';
  }
});

