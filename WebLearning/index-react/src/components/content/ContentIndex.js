import React from 'react';
import Partners from './Partners.js'
import Courses from './Courses.js';
import Reviews from './Reviews.js'


const ContentIndex = () => (
    <section className="content content__two-columns">
        <div className="content-left-wrapper">
            <div className="content__block">
                <div className="content__header">
                    Популярные курсы
                </div>
                <Courses />
            </div>
            <Reviews />
        </div>
        <Partners />

    </section>
)

export default ContentIndex