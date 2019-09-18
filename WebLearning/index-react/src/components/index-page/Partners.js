import React from 'react';
import Company from './Company.js'
import Wolf from '../../images/wolf.png'
import Rabbit from '../../images/rabbit.png'
import Bear from '../../images/bear.png'

const PARTNERS = [
    {name: 'АО "Волчий софт"', img: Wolf},
    {name: 'Государственная корпорация "Зайцы-тестировщики"', img: Rabbit},
    {name: 'Студия "Дизайн от медведя Семена"', img: Bear}
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