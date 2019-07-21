class Lesson {
    constructor (id, title, desc, courseId, date) {
        this.id = id;
        this.title = title;
        this.desc = title;
        this.courseId = courseId;
        this.date = date;
        this.tutor = 'Лисица Рыжая Коварная'
    }
}

var lessons = [
        new Lesson (0, 'Введение в Python. Расскажем про основные типы данных в Python - числа,' +
        'строки, списки, словари, множества. Изучим, как писать функции, а также коснемся понятия ООП и классов.',
        '', 1, new Date(2019,6,5)),
        new Lesson (1, 'Введение в CSS', '', 2, new Date(2019,6,14)),
        new Lesson (2, 'Обзор JS', '', 3, new Date(2019,6,12)),
        new Lesson (3, 'Общение - это легко', '', 4, new Date(2019,7,1)),
        new Lesson (4, 'Наследование в Python', '', 1, new Date(2019,6,18)),
        new Lesson (5, 'Наследование и каскадирование в CSS ', '', 2, new Date(2019,6,25)),
        new Lesson (6, 'Классы и наследование в JS', '', 3, new Date(2019,7,30)),
        new Lesson (7, 'Как стать хорошим собеседником?', '', 4, new Date(2019,6,11)),
        new Lesson (8, 'Классы в Python', '', 1, new Date(2019,7,15)),
        new Lesson (9, 'Асинхронность в Python', '', 1, new Date(2019,7,25)),
        ]

var coursesData = [
{id: 1,
name: 'Web разработка на Python',
lang: 'Python',
img: 'images/python-1.png',
desc: 'Много всего интересного про язык программирования Python',
link: '/courses/python-1.html'},

{id: 2,
name: 'Верстка с помощью CSS',
lang: 'CSS',
img: 'images/css-1.png',
desc: 'Всякая разная информация о верстке с помощью CSS и еще всякая разная информация и еще и еще и еще чтобы проверить, как верстается карточка курса.',
link: '/courses/css-1.html'},

{id: 3,
name: 'JavaScript для продвинутых',
lang: 'JavaScript',
img: 'images/js.png',
desc: 'После прохождения этого курса вы сможете вдохнуть жизнь и движение в свои проекты.',
link: '/courses/javascript-1.html'},

{id: 4,
name: 'Софт-скиллз для разработчиков',
lang: 'Разное',
img: 'images/foxy.png',
desc: 'Ты погружен в мир технологий и совершенно не умеешь общаться с живыми людьми? Лисичка тебе поможет!',
link: '/courses/softskills.html'},

]

//filter filling
var filter = document.querySelector('.schedule-filter')
for (var course in coursesData) {
    var option = document.createElement('option')
    option.value = coursesData[course].name
    option.textContent = coursesData[course].name
    filter.appendChild(option)
}

//filter work

var table = document.querySelector('.schedule-table')

filter.onchange = function() {
  var items = table.children;
  for (var i=1; i<items.length; i++) {
    var course = items[i].lastChild
  	if (course.textContent.includes(this.value) || this.value === 'all') {
    	items[i].style.display = '';
    } else {
    	items[i].style.display = 'none';
    }
  }
};

// schedule table filling

lessons.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

var tableFiller = (colNumber, cellClass, data, table) => {
    var tr = document.createElement('tr')
    for (var i = 0; i < colNumber; i++) {
        var td = document.createElement('td')
        td.classList.add(cellClass)
        td.textContent = data[i]
        tr.appendChild(td)
    }
    table.appendChild(tr)
}



var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
};

for (var i = 0; i < lessons.length; i++) {
    tableFiller(4, 'schedule-table__row', [lessons[i].date.toLocaleString('ru', options),
    lessons[i].desc, lessons[i].tutor, coursesData[lessons[i].courseId - 1].name], table)
}