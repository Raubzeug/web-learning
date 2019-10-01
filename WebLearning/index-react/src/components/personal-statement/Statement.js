import React from 'react'
import { connect } from "react-redux";
import Mark from './Mark'
import fetchData from '../../services/fetchData'


class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pupils: [],
            display: [],
            pupil: '',
            search: '',
            permission: false
        }
    }

    submitForm = (event, eventData) => {

        // fetch to server (now backend hasn't marks model)
    }

    dataSearch = ({ target} ) => {
        this.setState({search: target.value })
        const result = this.state.pupils.filter(user => {
            const fio = user.first_name.toLowerCase() + user.last_name.toLowerCase()
            return fio.includes(target.value)})
        this.setState({display: result})
        }

    componentDidMount = () => {
        if (this.props.user_info.username === 'admin') {
            this.setState({permission: true})
        }

        this.props.user_info.courses.forEach(course => {
            fetchData(course.slice(22,), undefined, undefined, true)
                .then(response => response.json())
                .then(json => {
                    let courseTitle = json.title
                    json.pupils.forEach(el => {
                        fetchData(el.slice(22,), undefined, undefined, true)
                            .then(response => response.json())
                            .then(json => {
                                json['course_title'] = courseTitle
                                this.setState({pupil: json})
                                this.setState(state => {
                                    const pupils = state.pupils.concat(state.pupil)
                                    return {
                                        pupils,
                                        pupil: ''
                                    }
                                })
                                this.setState({display: this.state.pupils})
                            })
                            .catch(err => console.error(err))
                        })
                    })
                .catch(err => console.error(err))
            })
        }



    render = () => {
        if (!this.state.permission) {
            return <div>Access denied!</div>}
        if (this.state.permission) {
            return (
            <div>
                <div className="searchbar form-group">
                    <input
                    value={this.state.search}
                    type="text"
                    className="schedule-filter"
                    placeholder="Search pupil by name..."
                    onChange={this.dataSearch}
                    />
                </div>
                <table className='schedule-table'>
                    <thead>
                        <tr>
                            <th className='schedule-table__header medium_field'>Курс</th>
                            <th className='schedule-table__header wide_field'>ФИО</th>
                            <th className='schedule-table__header medium_field'>Успеваемость</th>
                            <th className='schedule-table__header medium_field'>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.pupils.length > 0 && this.state.display.map(el => ( 
                            <tr key={el.username+el.course_title}>
                                <td className='schedule-table__row'>{el.course_title}</td>
                                <td className='schedule-table__row-centered'>
                                    {el.firtst_name + ' ' + el.last_name}
                                </td>
                                <td className='schedule-table__row-centered'>
                                    <Mark/>
                                </td>
                                <td className='schedule-table__row'>{el.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )
            }
    }
}

const mapStateToProps = state => {
    return {
        user_info: state.user_info
    };
  }


export default connect(
    mapStateToProps 
)(Schedule)