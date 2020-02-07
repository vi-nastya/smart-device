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
