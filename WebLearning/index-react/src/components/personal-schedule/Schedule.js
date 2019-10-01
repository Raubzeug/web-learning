import React from 'react'
import { connect } from "react-redux";
import fetchData from '../../services/fetchData'


class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lessons: [],
            lesson: '',
            display: [],
            courses: new Set(),
            selected: '',
        }
    }

    handleChange = ({ target }) => {
        this.setState({selected: target.value})
        if (target.value !== '' && target.value !== 'all') {
            const result = this.state.lessons.filter(les => {
                return les.course_title.includes(target.value)
            })
            this.setState({display: result})
        }
        else {
            this.setState({display: this.state.lessons})
        }
        this.forceUpdate()
    }

    componentDidMount = () => {
        this.props.user_info.courses.forEach(course => {
            fetchData(course.slice(22,), undefined, undefined, true)            
            .then(response => response.json())
            .then(json => {
                let tutor = json.tutor
                let courseTitle = json.title

                this.setState(state => {
                    const courses = state.courses.add(courseTitle)
                    return {
                        courses
                    }
                })

                json.lessons.forEach(el => {
                    fetchData(el.slice(22,), undefined, undefined, true)
                        .then(response => response.json())
                        .then(json => {
                            json['tutor'] = tutor
                            json['course_title'] = courseTitle
                            this.setState({lesson: json})
                            this.setState(state => {
                                const lessons = state.lessons.concat(state.lesson)
                                lessons.sort((a, b) => a.data > b.data ? 1 : -1)
                                return {
                                    lessons,
                                    lesson: '',
                                    display: lessons
                                }
                            })
                        })
                        .catch(err => console.error(err))
                })
                })
                .catch(err => console.error(err))
        })
            
    }

    render = () => (
        <div>
        <select className="schedule-filter" onChange={this.handleChange}>
            <option value="all">Все курсы</option>
            {Array.from(this.state.courses).map(el => <option value={el} key={el}>{el}</option>)}
        </select>
        <table className='schedule-table'>
            <thead>
                <tr key='a'>
                    <th className='schedule-table__header datetime'>Дата и время</th>
                    <th className='schedule-table__header description'>Событие</th>
                    <th className='schedule-table__header tutor'>Преподаватель</th>
                    <th className='schedule-table__header'>Курс</th>
                </tr>
            </thead>
            <tbody>
                
                {this.state.display.map(el => (
                    <tr key={el.id}>
                        <td className='schedule-table__row'>{el.data}</td>
                        <td className='schedule-table__row'>{el.title}</td>
                        <td className='schedule-table__row'>{el.tutor}</td>
                        <td className='schedule-table__row'>{el.course_title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        user_info: state.user_info
    };
  }


export default connect(
    mapStateToProps 
)(Schedule)