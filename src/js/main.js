
import "./slader";
window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    // promo
    const burger = document.querySelector('.burger'),
    menuClose = document.querySelector('.menu__close'),
    menuActive = document.querySelector('.menu__active');


    burger.addEventListener('click', () =>{
      burger.classList.toggle('burger_active');

      if (burger.classList.contains("burger_active")) {
          menuClose.style.display="none";
          menuActive.style.display="block";
      } else {
          menuClose.style.display="block";
          menuActive.style.display="none";
        
      }

    });

    // модельное окно

    const modal = document.querySelector('.modal');// объект
    const btn = document.querySelectorAll('.button__modal');// масив
    const close = document.querySelector('.close');
    const windows = document.querySelectorAll('[data-modal]');

    btn.forEach(item => {

        item.addEventListener('click', (e) =>{

            if (e.target){
                e.preventDefault();
            }
            
            windows.forEach(item =>{
                item.style.display ="none";
            });

            modal.style.display = "block";

            document.body.style.overflow = "hidden"; //  для того чтобы при появлении мод окна страница замораживалась
        });
    });

    close.addEventListener('click', () => {
        modal.style.display ='none';
        document.body.style.overflow = "";
    });

    // post

const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }

});