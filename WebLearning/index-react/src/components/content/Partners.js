import React from 'react';
import Company from './Company.js'

const PARTNERS = [
    {name: 'АО "Волчий софт"', img: 'wolf.png'},
    {name: 'Государственная корпорация "Зайцы-тестировщики"', img: 'rabbit.png'},
    {name: 'Студия "Дизайн от медведя Семена"', img: 'bear.png'}
]

const Partners = () => (
    <aside className="content-right-wrapper">
        <div className="content__header">Предложения работодателей</div>
        {PARTNERS.map((element, index) => (
        <Company key={index} name={element.name} img={element.img} />
        )
        )}
    </aside>
)

export default Partners