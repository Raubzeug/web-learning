import React from 'react';

const Course = ({course}) => (
    <article className="course">
        <h1 className="course-heading">{course.name}</h1>
        <div className="course-meta">
            <div className="course-category">
                <span className="course-icon course-tag">Категория: </span>
                <span>{course.lang}</span>
            </div>
        </div>
        <div className="course-content">
        <figure className="course-figure">
            <img className="course-img" src={require("../../images/" + course.img)} alt={course.lang} />
            <figcaption>
                <p>{course.caption}</p>
            </figcaption>
        </figure>
        <a className="course-info-button" href={course.url}>Информация о курсе</a>
        </div>
    </article>
)

export default Course