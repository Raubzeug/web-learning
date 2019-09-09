import React from 'react';
import Review from './Review.js'

const REVIEWS = [
    {text: 'Супер!', author: 'Елена'},
    {text: 'Отлично!', author: 'Елена'},
    {text: 'Отзыв немного подлинее, чтобы проверить форматирование!', author: 'Елена'},
    {text: 'Отзыв немного подлинее, чтобы проверить форматирование!', author: 'Елена'}
]

const Reviews = () => (
    <div className="feedback__block">
        <div className="content__header">Отзывы студентов</div>
        {REVIEWS.map((element, index) => (
            <Review key={index} review={element} />
        )
        )}
    </div>
)

export default Reviews
