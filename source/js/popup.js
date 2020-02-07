'use strict';
var popupOpenButton = document.querySelector('.page-header__call-me');
var popup = document.querySelector('.popup');

popupOpenButton.addEventListener('click', function () {
  popup.classList.remove('popup--closed');

  var closePopupButton = popup.querySelector('.popup-close');
  closePopupButton.addEventListener('click', function () {
    popup.classList.add('popup--closed');
  });
});
