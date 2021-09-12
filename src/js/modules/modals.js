const modals = () => {
    function bindModal(triggerSelektor, modalSelektor, closeSelektor, closeClickOverlay = true){ // функция отвечающая за привязку окна к определенному тригеру ( тригер силектор кнопки, кнопка закрытия)

        const trigger = document.querySelectorAll(triggerSelektor),
              modal = document.querySelector(modalSelektor),
              close = document.querySelector(closeSelektor),
              windows = document.querySelectorAll('[data-modal]');

        trigger.forEach(item => {

            item.addEventListener('click', (e) =>{

                if (e.target){
                    e.preventDefault(); // проверяем существует ли элимент на стринице
                }
                
                windows.forEach(item =>{
                    item.style.display ="none";
                });

                modal.style.display = "block";
                // document.body.classList.add('modal-open'); // класс бустрепа 
    
                document.body.style.overflow = "hidden"; //  для того чтобы при появлении мод окна страница замораживалась
            });
        });



        close.addEventListener('click', () => {

            windows.forEach(item =>{
                item.style.display ="none";
            });

            modal.style.display = "none";
            // document.body.classList.remove('modal-open'); // класс бустрепа 

            document.body.style.overflow = ""; //  возращаем стондартное поведение
        });

        modal.addEventListener('click', (e) =>{
            if (e.target === modal && closeClickOverlay) {

                windows.forEach(item =>{
                    item.style.display ="none";
                });

                modal.style.display = "none";
                // document.body.classList.remove('modal-open'); // класс бустрепа 
                document.body.style.overflow = ""; //  возращаем стондартное поведение
            }
        });
    }

    function ShowModalByTime(selector, time){
        setTimeout(function(){
            document.querySelector(selector).style.display = 'block'; 
            document.body.style.overflow = "hidden";
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close',); // кнопка на которую навешиваеться обработчик события , модельное окно, кнопка закрытия модельного окна
    bindModal('.phone_link', '.popup', '.popup .popup_close'  ); // кнопка на которую навешиваеться обработчик события , модельное окно, кнопка закрытия модельного окна
    // ShowModalByTime('.popup', 60000); // модельное окно, время
    bindModal('.popup_calc_btn', '.popup_calc','.popup_calc_close'); // можельные окна выбора типа окна и заказа
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

};

export default modals;