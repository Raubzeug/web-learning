import {checkMenuButton} from './checkMenuButton'
import {getCookie} from './getCookie'

var coursesListField = $('.courses')
var courseTemp = $('#course-template').prop('content')

$(document).ready(function() {
    console.log(document.cookie)

    var headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
    // 'Authorization': 'Token ' + getCookie('token'),
}
  fetch('/api/courses/', {
      method: 'GET',
      credentials: 'include',
      headers: headers
  })
  .then(response => response.json())
  .then(data => {
    for (let key in data.results) {          
        let newCourse = $(courseTemp).find('.course_wrapper').clone();
        $(newCourse).find('.course-heading').text(data.results[key].title)
        $(newCourse).find('.course-category span').last().text(data.results[key].language)
        $(newCourse).find('.course-figure figcaption').text(data.results[key].description)
        $(newCourse).find('.course-img').attr('src', "../images/foxy.png")
        let button = $(newCourse).find('.course-info-button')
        var flag = 0
        newCourse.hover(function() {
            newCourse.addClass('course_hover')
        })
        newCourse.mouseleave(function() {
            newCourse.removeClass('course_hover')
        })
        button.click(function (evt) {
            evt.preventDefault()
            if  (!newCourse.hasClass('course_wrapper_full')) {
                newCourse.addClass('course_wrapper_full')
                $(newCourse).find('.course_additional_info').removeClass('hidden')
                button.text('Скрыть информацию о курсе')
            }
            else {
                newCourse.removeClass('course_wrapper_full')
                $(newCourse).find('.course_additional_info').addClass('hidden')
                button.text('Посмотреть информацию о курсе')
            }
        })
        coursesListField.append(newCourse);
      }
    })
})



// var el=document.querySelectorAll('.navigation__button a')
// for (var i = 0; i < el.length; i++){
//     console.log(el[i].href)
//     console.log(window.location)

//     if (el[i].href==window.location) {
//         el[i].classList.add('button--active')
//     }
// }


// var coursesData = [
// {id: 1,
// name: 'Web разработка на Python',
// lang: 'Python',
// img: '../images/python-1.png',
// desc: 'Много всего интересного про язык программирования Python',
// link: '/courses/python-1.html'},

// {id: 2,
// name: 'Верстка с помощью CSS',
// lang: 'CSS',
// img: '../images/css-1.png',
// desc: 'Всякая разная информация о верстке с помощью CSS и еще всякая разная информация и еще и еще и еще чтобы проверить, как верстается карточка курса.',
// link: '/courses/css-1.html'},

// {id: 3,
// name: 'JavaScript для продвинутых',
// lang: 'JavaScript',
// img: '../images/js.png',
// desc: 'После прохождения этого курса вы сможете вдохнуть жизнь и движение в свои проекты.',
// link: '/courses/javascript-1.html'},

// {id: 4,
// name: 'Софт-скиллз для разработчиков',
// lang: 'Разное',
// img: '../images/foxy.png',
// desc: 'Ты погружен в мир технологий и совершенно не умеешь общаться с живыми людьми? Лисичка тебе поможет!',
// link: '/courses/softskills.html'},

// ]



// var coursesListField = document.querySelector('.courses')
// var courseTemp = coursesListField.querySelector('#course-template').content
// var newCourseTemp = courseTemp.querySelector('.course_wrapper')
// var courses = coursesListField.children

// var addCourseHandler = (course) => {
//     var infoButton = course.querySelector('.course-info-button')
//     var courseAdditionalInfo = course.querySelector('.course_additional_info')
//     var flag = false
//     course.addEventListener('mouseover', function () {
//         course.classList.add('course_hover')
//     })
//     course.addEventListener('mouseout', function () {
//     course.classList.remove('course_hover')
//     })
//     infoButton.addEventListener('click', function(evt) {
//         if (flag === false) {
//         evt.preventDefault()
//         course.classList.add('course_wrapper_full')
//         courseAdditionalInfo.classList.remove('hidden')
//         infoButton.textContent = ('Скрыть информацию о курсе')
//         flag = true
//         }
//         else {
//             evt.preventDefault()
//             course.classList.remove('course_wrapper_full')
//             courseAdditionalInfo.classList.add('hidden')
//             infoButton.textContent = ('Посмотреть информацию о курсе')
//             flag = false
//         }
//     })
// }

// for (var i = 0; i < coursesData.length; i++) {
//     var newCourse = newCourseTemp.cloneNode(true);
//     var courseName = newCourse.querySelector('.course-heading')
//     var courseLang = newCourse.querySelector('.course-category span')
//     var courseImg = newCourse.querySelector('.course-img')
//     var courseDesc = newCourse.querySelector('.course-figure figcaption')
//     var courseLink = newCourse.querySelector('.course-content a')

//     newCourse.id = coursesData[i].id

//     courseName.textContent = coursesData[i].name
//     courseLang.textContent = coursesData[i].lang
//     courseImg.src = coursesData[i].img
//     courseImg.alt = coursesData[i].name
//     courseDesc.textContent = coursesData[i].desc
//     courseLink.href = coursesData[i].link
//     addCourseHandler(newCourse)
//     coursesListField.appendChild(newCourse)
// }


