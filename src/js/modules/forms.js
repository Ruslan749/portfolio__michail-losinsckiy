const forms = () =>{
    const form = document.querySelectorAll('form');// получаем все формы на странице
    const inputs = document.querySelectorAll('input'); // рлучаем все инпуты на странице
    const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach(item => { // перебираем все формы с номерами
        item.addEventListener('input', () =>{ // навешиваем обработчик события  и отслеживаем то что ввел пользователь
            item.value = item.value.replace(/\D/, ''); //  ищем при помощи регулярного выражения и заменяем его на пустую строку
        });
    });

    const message ={ // сообщение о результате запросов
        loading: 'Загрузка...',
        success: 'спасибо! скоро мы с вами свяжемся',
        failure: 'Что то пошло не так!'
    };

    const postData = async (url, data) => {  //async показывает что в нутри кода есть асинхорнные операции
        document.querySelector('.status').textContent = message.loading; // используем блок который создасца только во время запроса и добавляем туда текст

        let res = await fetch(url,{ // настрйоки пост запроса, которая ждет окончания операции
            method:'POST',
            body: data,
        });

        return await res.text(); // тоже ждет оканчание выполнения запроса
    };

    const clearInputs = () =>{ // функция для очистки формы

        inputs.forEach(item => { // пребираем все инпуты

            item.value = ""; //  устанавливаем пустую строку для всех инпутов
        });
    };

    form.forEach(item => { // получаем каждую форму при помощи перебора
        item.addEventListener('submit', (e) =>{ // навешиваем на каждую форму обработчик события
            e.preventDefault(); // отменяем стандартное поведение браузера

            let statusMessage = document.createElement('div'); // создаем блок в котором будет выводиться статус отправки формы

            statusMessage.classList.add('status');// добавляем класс для нашего див элимента
            item.appendChild(statusMessage); // помещаем наш див элимент в конец формы отправки

            const formData = new FormData(item); // 'этот объект найдет все инпуты соберет все данные и сохранит в переменную (получилось тело запроса)

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })

                .catch(() => statusMessage.textContent = message.failure)

                .finally(() => {
                    clearInputs();
                    setTimeout(() =>{
                        statusMessage.remove();
                    },5000);
                });

        });
    });
};

export default forms;