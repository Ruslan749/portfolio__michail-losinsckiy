const tabs = (headeSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headeSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    function hideTabContent () { //  скрыть табы на странице

        content.forEach(item => {
            item.style.display = 'none';
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) { // показать табы на странице (i = 0 - пораметры по умолчанию)
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    // делигирование событий (узнать на какой конкретно блок кликнул пользователь)
    
    header.addEventListener('click', (e) =>{ // навешиваем обработчик события на общую область которая соединяет все табы
        const target = e.target;

        if (target && (target.classList.contains(tabSelector.replace(/\./,'')) || target.parentNode.classList.contains(tabSelector.replace(/\./,'')))) { // проверяем то что мы действительно кликнули в один из табов
            tab.forEach ((item, i) => { // перебираем табы и запоминаем сам таб и номер по порядку
                if (target == item || target.parentNode == item) { // как только кликнули на таб и он равен табу который перебираеться выполняем условие
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};

export default tabs;