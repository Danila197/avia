// Search elements in layout
const formSearch = document.querySelector('.form-search'),
  inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
  dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from '),
  inputCitiesTo = formSearch.querySelector('.input__cities-to'),
  dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
  inputDateDepart  = formSearch.querySelector('.input__date-depart'),
  buttonSearch = formSearch.querySelector('.button__search');

//create array cities

const city = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Краснодар', 'Саратов', 'Тюмень', 'Тольятти', 'Ижевск', 'Барнаул', 'Ульяновск', 'Иркутск', 'Хабаровск', 'Ярославль', 'Владивосток', 'Махачкала', 'Томск', 'Оренбург', 'Кемерово', 'Новокузнецк', 'Рязань', 'Набережные Челны', 'Астрахань', 'Пенза', 'Киров', 'Липецк', 'Балашиха', 'Чебоксары', 'Калининград', 'Тула', 'Курск', 'Ставрополь', 'Севастополь', 'Крым', 'Сочи', 'Улан-Удэ', 'Тверь', 'Магнитогорск', 'Иваново', 'Брянск', 'Белгород', 'Сургут', 'Владимир', 'Чита', 'Нижний Тагил', 'Архангельск', 'Симферополь', 'Калуга', 'Смоленск', 'Волжский', 'Якутск', 'Саранск', 'Череповец', 'Курган', 'Вологда', 'Орёл', 'Подольск', 'Грозный', 'Владикавказ', 'Тамбов', 'Мурманск', 'Петрозаводск', 'Нижневартовск', 'Кострома', 'Стерлитамак', 'Новороссийск', 'Йошкар-Ола', 'Химки', 'Таганрог', 'Комсомольск-на-Амуре', 'Сыктывкар', 'Нижнекамск', 'Нальчик', 'Мытищи', 'Шахты', 'Дзержинск', 'Энгельс', 'Орск', 'Благовещенск', 'Братск', 'Королёв', 'Великий Новгород', 'Ангарск', 'Старый Оскол', 'Псков', 'Люберцы', 'Южно-Сахалинск', 'Бийск', 'Армавир', 'Прокопьевск', 'Балаково', 'Абакан', 'Рыбинск', 'Северодвинск', 'Норильск', 'Петропавловск-Камчатский', 'Красногорск', 'Уссурийск', 'Волгодонск', 'Новочеркасск', 'Сызрань', 'Каменск-Уральский', 'Златоуст', 'Альметьевск', 'Электросталь', 'Керчь', 'Миасс', 'Салават', 'Пятигорск', 'Копейск', 'Находка', 'Хасавюрт', 'Рубцовск', 'Майкоп', 'Коломна', 'Березники', 'Домодедово', 'Ковров', 'Одинцово', 'Нефтекамск', 'Кисловодск', 'Батайск', 'Нефтеюганск', 'Новочебоксарск', 'Серпухов', 'Щёлково', 'Дербент', 'Каспийск', 'Черкесск', 'Новомосковск', 'Назрань', 'Раменское', 'Первоуральск', 'Кызыл', 'Орехово-Зуево', 'Новый Уренгой', 'Обнинск', 'Невинномысск', 'Долгопрудный', 'Октябрьский', 'Димитровград', 'Ессентуки', 'Камышин', 'Евпатория', 'Реутов', 'Жуковский', 'Пушкино', 'Муром', 'Ноябрьск', 'Новошахтинск', 'Северск', 'Артём', 'Ачинск', 'Бердск', 'Ногинск', 'Арзамас', 'Элиста', 'Елец', 'Ханты-Мансийск', 'Новокуйбышевск', 'Железногорск', 'Сергиев Посад', 'Зеленодольск'];

//Функция показа списка, чтобы не дублировать для второго поля. Вложим параметры, т.к они для разных полей разные сделаем их одинаковые 
// а вызове функций для разных полей подставим параметры для каждого свои. И заменим в общей функции все поля вввода на параметы
const showCity = (input, list) =>{
  //Чтобы li элементы очищались
  list.textContent = '';
  //Если поле пустое, то спикок всех не выводим и выходим из функции
  if (!input.value) return;
    // Если не пустое, то делаем вывод
    // filter фильтруем в зависимости от того что вводим в инпут т.е города(Item), так же применяется index - вторым параметром
    // Создадим переменную в которую будет возвращаться города, попавшие под filter
    const filterCity = city.filter((item) => {
      //Переменная для переключения названия города в нижний регистр
      const fixItem = item.toLowerCase();
      //Возвращаем через includes (содержит) содержимое значения у инпута и переводим в нижний регистр
      return fixItem.includes(input.value.toLowerCase())
    });
    //Из отфильтрованного выше, сделаем перебор, для выведения его на экран
    filterCity.forEach((item) => {
      //Создаем переменную, которая будет создавать в разметке элементы li
      const li = document.createElement('li');
      //Добавим класс элементу li
      li.classList.add('dropdown__city');
      //Заносим города в элементы li
      li.textContent = item;
      //Добавляем li в разметку
      list.append(li)
      // console.log(li);
    });  
}
const cityInInput = (inputIn, cityIn) => {
  const target = event.target;
  console.log(event);
  //Проверим что кликнули именно в li
  if (target.tagName.toLowerCase() === 'li') {
    inputIn.value = target.textContent;
    cityIn.textContent = ''
  }
}

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
dropdownCitiesFrom.addEventListener('click', () => {
  // const target = event.target;
  // console.log(event);
  // //Проверим что кликнули именно в li
  // if (target.tagName.toLowerCase() === 'li') {
  //   inputCitiesFrom.value = target.textContent;
  //   dropdownCitiesFrom.textContent = ''
  // }
  cityInInput(inputCitiesFrom, dropdownCitiesFrom);
});

// Прослушиваем событие на dropdownCitiesTo список городов
dropdownCitiesTo.addEventListener('click', (event) => {
  const target = event.target;
  console.log(event);
  //Проверим что кликнули именно в li
  if (target.tagName.toLowerCase() === 'li') {
    inputCitiesTo.value = target.textContent;
    dropdownCitiesTo.textContent = ''
  }
});

// .wrapper__search {
// }
// .input {
// }
// .dropdown {
// }
// .wrapper__button {
// }
// .button {
// }
// .button__search-text {
// }