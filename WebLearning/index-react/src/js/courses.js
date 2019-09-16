import {checkMenuButton} from './checkMenuButton'
import {getCookie} from './getCookie'

const coursesListField = $('.courses')
const courseTemp = $('#course-template').prop('content')

$(document).ready(() => {

    const headers = {
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
    for (const key in data) {          
        const newCourse = $(courseTemp).find('.course_wrapper').clone();
        $(newCourse).find('.course-heading').text(data[key].title)
        $(newCourse).find('.course-category span').last().text(data[key].language)
        $(newCourse).find('.course-figure figcaption').text(data[key].description)
        $(newCourse).find('.course-img').attr('src', "../images/foxy.png")
        const button = $(newCourse).find('.course-info-button')
        newCourse.hover(() => {
            newCourse.addClass('course_hover')
        })
        newCourse.mouseleave(() => {
            newCourse.removeClass('course_hover')
        })
        button.click((evt) => {
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