import React from 'react';
import Course from './Course.js'
import './courses.less'
import Pic1 from '../../images/python-1.png'
import Pic2 from '../../images/css-1.png'

const COURSES = [
    {
        name: 'Web разработка на Python',
        lang: 'Python',
        img: Pic1,
        caption: 'Много всего интересного про язык программирования Python',
        url: '/courses/python-1.html'
    },
    {
        name: 'Верстка с помощью CSS',
        lang: 'CSS',
        img: Pic2,
        caption: `Всякая разная информация о верстке с помощью CSS и еще всякая
         разная информация и еще и еще и еще чтобы проверить, как верстается карточка курса.`,
        url: '/courses/css-1.html'
    },
]

const Courses = () => (
    <div className="courses">
        {COURSES.map((element, index) => (
            <Course key={index} course={element} />
        )
        )}
    </div>
)

export default Courses