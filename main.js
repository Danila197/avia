//-----------КОНСТАНТЫ------------------*/

// Search elements in layout
const formSearch = document.querySelector('.form-search'),
  inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
  dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from '),
  inputCitiesTo = formSearch.querySelector('.input__cities-to'),
  dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
  inputDateDepart = formSearch.querySelector('.input__date-depart'),
  buttonSearch = formSearch.querySelector('.button__search'),
  cheapestTicket = document.getElementById('cheapest-ticket'),
  otherCheapTickets = document.getElementById('other-cheap-tickets');
  // Данные из API
  // const cityesApi = "http://api.travelpayouts.com/data/ru/cities.json" убираем, т.к не будем обращаться к серверу, а будем обращаться к 
  //скаченному файлу json
const cityesApi = "database/cities.json",
  proxy = 'https://cors-anywhere.herokuapp.com/',
  API_KEY = "9a2f614b2445c6cdc8091b1ca5788657",
  calendar = "http://min-prices.aviasales.ru/calendar_preload",
  //кол-во карточек на другую дату
  MAX_COUNT = 10;
  
//create array cities 
let city = [];
//2 - день Удалим массив 
// const city = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Краснодар', 'Саратов', 'Тюмень', 'Тольятти', 'Ижевск', 'Барнаул', 'Ульяновск', 'Иркутск', 'Хабаровск', 'Ярославль', 'Владивосток', 'Махачкала', 'Томск', 'Оренбург', 'Кемерово', 'Новокузнецк', 'Рязань', 'Набережные Челны', 'Астрахань', 'Пенза', 'Киров', 'Липецк', 'Балашиха', 'Чебоксары', 'Калининград', 'Тула', 'Курск', 'Ставрополь', 'Севастополь', 'Крым', 'Сочи', 'Улан-Удэ', 'Тверь', 'Магнитогорск', 'Иваново', 'Брянск', 'Белгород', 'Сургут', 'Владимир', 'Чита', 'Нижний Тагил', 'Архангельск', 'Симферополь', 'Калуга', 'Смоленск', 'Волжский', 'Якутск', 'Саранск', 'Череповец', 'Курган', 'Вологда', 'Орёл', 'Подольск', 'Грозный', 'Владикавказ', 'Тамбов', 'Мурманск', 'Петрозаводск', 'Нижневартовск', 'Кострома', 'Стерлитамак', 'Новороссийск', 'Йошкар-Ола', 'Химки', 'Таганрог', 'Комсомольск-на-Амуре', 'Сыктывкар', 'Нижнекамск', 'Нальчик', 'Мытищи', 'Шахты', 'Дзержинск', 'Энгельс', 'Орск', 'Благовещенск', 'Братск', 'Королёв', 'Великий Новгород', 'Ангарск', 'Старый Оскол', 'Псков', 'Люберцы', 'Южно-Сахалинск', 'Бийск', 'Армавир', 'Прокопьевск', 'Балаково', 'Абакан', 'Рыбинск', 'Северодвинск', 'Норильск', 'Петропавловск-Камчатский', 'Красногорск', 'Уссурийск', 'Волгодонск', 'Новочеркасск', 'Сызрань', 'Каменск-Уральский', 'Златоуст', 'Альметьевск', 'Электросталь', 'Керчь', 'Миасс', 'Салават', 'Пятигорск', 'Копейск', 'Находка', 'Хасавюрт', 'Рубцовск', 'Майкоп', 'Коломна', 'Березники', 'Домодедово', 'Ковров', 'Одинцово', 'Нефтекамск', 'Кисловодск', 'Батайск', 'Нефтеюганск', 'Новочебоксарск', 'Серпухов', 'Щёлково', 'Дербент', 'Каспийск', 'Черкесск', 'Новомосковск', 'Назрань', 'Раменское', 'Первоуральск', 'Кызыл', 'Орехово-Зуево', 'Новый Уренгой', 'Обнинск', 'Невинномысск', 'Долгопрудный', 'Октябрьский', 'Димитровград', 'Ессентуки', 'Камышин', 'Евпатория', 'Реутов', 'Жуковский', 'Пушкино', 'Муром', 'Ноябрьск', 'Новошахтинск', 'Северск', 'Артём', 'Ачинск', 'Бердск', 'Ногинск', 'Арзамас', 'Элиста', 'Елец', 'Ханты-Мансийск', 'Новокуйбышевск', 'Железногорск', 'Сергиев Посад', 'Зеленодольск'];



//-----------ФУНКЦИИ------------------*/

// Функция приема данных с сервера
const getData = (url, callback, errorFunc = console.error) => {
  //Создадим переменную для объекта запроса данных, на основе API XMLHttpRequest
  const request = new XMLHttpRequest();
  // говорим какой запрос и с какого url
  request.open('GET', url);
  //Обработчик события, чтоб не пропустить ответ с запроса
  request.addEventListener('readystatechange', () => {
    //Когда приходит ответ (это - 4)
    if (request.readyState !== 4) return;
    //Проверяем ответ, положительный (200) или нет
    if (request.status === 200) {
      //Если положительный запускаем функцию
      callback(request.response)
    } else {
      errorFunc(request.status);
    }
  });
  //Выполнение запроса
  request.send();
};

//Функция показа списка, чтобы не дублировать для второго поля. Вложим параметры, т.к они для разных полей разные сделаем их одинаковые 
// а вызове функций для разных полей подставим параметры для каждого свои. И заменим в общей функции все поля вввода на параметы
const showCity = (input, list) => {
  //Чтобы li элементы очищались
  list.textContent = '';
  //Если поле пустое, то спикок всех не выводим и выходим из функции
  if (input.value !== '') {
    // filter фильтруем в зависимости от того что вводим в инпут т.е города(Item), так же применяется index - вторым параметром
    // Создадим переменную в которую будет возвращаться города, попавшие под filter
    const filterCity = city.filter((item) => {
        //Перед тем как приводить в нижний регистр отфильтруем
        //Переменная для переключения названия города в нижний регистр добавим.name, т.к работаем с отдельной БД в которой name - название города 
        const fixItem = item.name.toLowerCase();
        //Возвращаем через includes (содержит) содержимое значения у инпута и переводим в нижний регистр ....через startsWith тк подключили сортировку
        return fixItem.startsWith(input.value.toLowerCase())
    });
    //Из отфильтрованного выше, сделаем перебор, для выведения его на экран
    filterCity.forEach((item) => {
      //Создаем переменную, которая будет создавать в разметке элементы li
      const li = document.createElement('li');
      //Добавим класс элементу li
      li.classList.add('dropdown__city');
      //Заносим города в элементы li
      li.textContent = item.name;
      //Добавляем li в разметку
      list.append(li)
      // console.log(li);
    });
  }
};

//Функция количесва пересадок
const getChanges = (num) => {
  if (num) {
    return num === 1 ? 'С одной пересадкой' : 'С двумя пересадками';
  } else {
    return 'Без пересадок'
  }
};
const getLinkAviaSales = (data) => {
  let link = 'https://www.aviasales.ru/search/';

  link += data.origin;

  const date = new Date(data.depart_date);

  const day = date.getDate();

  link += day < 10 ? '0' + day : day;
  
  const month = date.getMonth() + 1;

  link += month < 10 ? '0' + month : month;

  link += data.destination;

  link += '1';

  console.log(link);
  
  return link;
}
//Функция для вставки выбранного города, чьобы не дублировать код внизу
const cityInInput = (event, inputIn, cityIn) => {
  const target = event.target;
  //Проверим что кликнули именно в li
  if (target.tagName.toLowerCase() === 'li') {
    inputIn.value = target.textContent;
    cityIn.textContent = ''
  }
};
const getNameCity = (code) => {
  const objCity = city.find((item) => item.code === code);
  return objCity.name;
};
//Функция форматирования даты
const getDate = (date) => {
  return new Date(date).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute:'2-digit',
  });
}
//Функция создания карточки
const createCard = (data) => {
  const ticket = document.createElement('article')
  ticket.classList.add('ticket');

  let deep = '';

  if (data) {
    deep = `
    <h3 class="agent">${data.gate}</h3>
      <div class="ticket__wrapper">
        <div class="left-side">
          <a href="${getLinkAviaSales(data)}" target="_blank" class="button button__buy">Купить
            за ${data.value}₽</a>
        </div>
        <div class="right-side">
          <div class="block-left">
            <div class="city__from">Вылет из города
              <span class="city__name">${getNameCity(data.origin)}</span>
            </div>
            <div class="date">${getDate(data.depart_date)}</div>
          </div>

          <div class="block-right">
            <div class="changes">${getChanges(data.number_of_changes)}</div>
            <div class="city__to">Город назначения:
              <span class="city__name">${getNameCity(data.destination)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    deep = '<h3>Билетов на текущую дату нет</h3>'
  }

  ticket.insertAdjacentHTML('afterbegin', deep)


  return ticket;
}
//функция для рендера карточек с ценой на день
const renderCheapDay = (cheapTicket) => {
  cheapestTicket.style.display = 'block';
  //Очистка от уже найденных рейсов
  cheapestTicket.innerHTML = '<h2>Самый дешевый билет на выбранную дату</h2>';
  const ticket = createCard(cheapTicket[0]);
  //выводим карточку 
  cheapestTicket.append(ticket)
}

//функция для рендера карточек с ценой на год
const renderCheapYear = (cheapTickets) => {
  otherCheapTickets.style.display = 'block';
  //Очистка от уже найденных рейсов
  otherCheapTickets.innerHTML = '<h2>Самые дешевые билеты на другие даты</h2>';
  //Сортировка по ценам
  cheapTickets.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
  //вывод карточек
  for (let i = 0; i < cheapTickets.length && i < MAX_COUNT; i++){
    const ticket = createCard(cheapTickets[i]);
    otherCheapTickets.append(ticket);
  }
  console.log(cheapTickets);
};

//Функция которая рендерит рейсы c данными рейса(data) и датой вылета (dateFly)
const renderCheap = (data, dateFly) => {
  //переменная получающая ценнник белетов из JSON на месяц
  const cheapTicketYear = JSON.parse(data).best_prices;
  //Переменнная для фильтрации билетов на день
  const cheapTicketDay = cheapTicketYear.filter((item) => {
    //Сравниваем введенну дату и дату белетов
    return item.depart_date === dateFly;
  })

  //вызываем функцию для рендера карточек с ценой на день
  renderCheapDay(cheapTicketDay);
  //Вызываем функцию для рендера карточек с ценой на год
  renderCheapYear(cheapTicketYear);
}
//-----------СОБЫТИЯ------------------*/

// Прослушиваем событие на inputCitiesFrom
inputCitiesFrom.addEventListener('input', () => {
  showCity(inputCitiesFrom, dropdownCitiesFrom);
});
// inputCitiesFrom.addEventListener('input', fucntion() {
//   showCity(inputCitiesFrom, dropdownCitiesFrom);
// });

// Прослушиваем событие на inputCitiesTo
inputCitiesTo.addEventListener('input', () => {
  showCity(inputCitiesTo, dropdownCitiesTo);
});

// Прослушиваем событие на dropdownCitiesFrom список городов
dropdownCitiesFrom.addEventListener('click', (event) => {
  // const target = event.target;
  // console.log(event);
  // //Проверим что кликнули именно в li
  // if (target.tagName.toLowerCase() === 'li') {
  //   inputCitiesFrom.value = target.textContent;
  //   dropdownCitiesFrom.textContent = ''
  // }
    cityInInput(event, inputCitiesFrom, dropdownCitiesFrom);
});

// Прослушиваем событие на dropdownCitiesTo список городов
dropdownCitiesTo.addEventListener('click', (event) => {
  // const target = event.target;
  // console.log(event);
  // //Проверим что кликнули именно в li
  // if (target.tagName.toLowerCase() === 'li') {
  //   inputCitiesTo.value = target.textContent;
  //   dropdownCitiesTo.textContent = ''
  // }
  cityInInput(event, inputCitiesTo, dropdownCitiesTo);
});
//
formSearch.addEventListener('submit', (event) => {
  //Отменяем стандартное событие. Для облегчения можно вместо (event) писать ({ target }), чтоб сразу получать target
  event.preventDefault();
  //Создадим переменную для сокращения записи Откуда летим
  // Для получения кода города используем find, чтоб найти код в JSON городах
  //Сокращенный вид записи
  const cityFrom = city.find(item => inputCitiesFrom.value === item.name);
  const cityTo = city.find((item) => { return (inputCitiesTo.value === item.name) });

  //создаем объект с тем куда летим, откуда и когда
  const formData = {
    // from: city.find((item) => {
    //   return (inputCitiesFrom.value === item.name).code
    // }),
    from: cityFrom,
    to: cityTo,
    when: inputDateDepart.value,
  };
  //Проверка существует ли город в списке
  if (formData.from && formData.to) {
    const requestData = `?depart_date=${formData.when}&origin=${formData.from.code}&destination=${formData.to.code}&one_way=true`;
    
    //переменная для создания запроса "?depart_date=2020-12-25&origin=SVX&destination=KGD&one_way=true&token="
    // const requestData2 = '?depart_date=' + formData.when +
    //   '&origin=' + formData.from +
    //   '&destination=' + formData.to +
    //   '&one_way=true&token=' + API_KEY;
    
    //Старая строка, работает и без хироку
    //getData(proxy + calendar + requestData, (response)
    getData(calendar + requestData, (response) => {
      // const cheapTicket = JSON.parse(data).best_prices.filter((item) => {
      //   return item.depart_date === '2020-12-25'
      // })
      renderCheap(response, formData.when)
    }, (e) => {
    alert('В этомм направлении нет рейсов');
    console.log('Ошибка', e);
});
  } else {
    alert('Input correct city');
  }
});
//-----------ВЫЗОВЫ ФУНКЦИЙ------------------*/
//Если работать через прокси, то нужна эта строчка
// getData(proxy + cityesApi, (data) => 
getData(cityesApi, (data) => {
  //передадим в переменную city распарсенный JSON
    city = JSON.parse(data).filter((item) => {
      //Фильтруем на пустые значения из полученных данных JSON
            return item.name
    });
  city.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
});
