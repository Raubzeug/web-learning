import React from 'react';
import Company from '../Company'
import Course from '../Course';
import Review from '../Review'
import './index-page.less'
import Pic1 from '../../images/python-1.png'
import Pic2 from '../../images/css-1.png'
import Wolf from '../../images/wolf.png'
import Rabbit from '../../images/rabbit.png'
import Bear from '../../images/bear.png'

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

const REVIEWS = [
    {text: 'Супер!', author: 'Елена'},
    {text: 'Отлично!', author: 'Елена'},
    {text: 'Отзыв немного подлинее, чтобы проверить форматирование!', author: 'Елена'},
    {text: 'Отзыв немного подлинее, чтобы проверить форматирование!', author: 'Елена'}
]

const PARTNERS = [
    {name: 'АО "Волчий софт"', img: Wolf},
    {name: 'Государственная корпорация "Зайцы-тестировщики"', img: Rabbit},
    {name: 'Студия "Дизайн от медведя Семена"', img: Bear}
]

const IndexContent = () => (
    <section className="content content__two-columns">
        <div className="content-left-wrapper">
            <div className="content__block">
                <div className="content__header">
                    Популярные курсы
                </div>
                <div className="courses">
                    {COURSES.map((element, index) => (
                        <Course key={index} course={element} />
                    )
                    )}
                </div>
            </div>
            <div className="feedback__block">
                <div className="content__header">Отзывы студентов</div>
                {REVIEWS.map((element, index) => (
                    <Review key={index} review={element} />
                )
                )}
            </div>
        </div>
        <aside className="content-right-wrapper">
            <div className="content__header">Предложения работодателей</div>
            {PARTNERS.map((element, index) => (
            <Company key={index} name={element.name} img={element.img} />
            )
            )}
        </aside>

    </section>
)

export default IndexContent