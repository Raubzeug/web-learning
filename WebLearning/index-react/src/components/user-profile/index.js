import React from 'react';
import './user-profile.less'
import PersonalData from '../personal-data'
import PersonalSchedule from '../personal-schedule'
import PersonalStatement from '../personal-statement'


class UserProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showPrivat: true,
            showSchedule: false,
            is_tutor: localStorage.is_tutor
        }
    }

    selectPrivat = () => {
        !this.state.showPrivat && this.setState({
            showPrivat: !this.state.showPrivat,
            showSchedule: !this.state.showSchedule
        })
    }

    selectSchedule = () => {
        !this.state.showSchedule && this.setState({
            showSchedule: !this.state.showSchedule,
            showPrivat: !this.state.showPrivat     
        })
    }

    render = () => (
        <section className="content">
            <div className="content__header_gradient">
                    <span>Личный кабинет</span>
            </div>
            <div className="content__submenu">
                    <span className='content__submenu_button' onClick={this.selectPrivat}>
                        Мой профиль
                    </span>
                    <span className='content__submenu_button' onClick={this.selectSchedule}>
                        {this.state.is_tutor && 'Ведомость учеников'}
                        {!this.state.is_tutor && 'Мое расписание'}
                    </span>
            </div>
            {this.state.showPrivat && <PersonalData />}
            {!this.state.is_tutor && this.state.showSchedule && <PersonalSchedule />}
            {this.state.is_tutor && this.state.showSchedule && <PersonalStatement />}
        </section>
    )
}

export default UserProfile