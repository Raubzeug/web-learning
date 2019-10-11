import React from 'react';
import './user-profile.less'
import PersonalData from '../personal-data'
import PersonalSchedule from '../personal-schedule'
import PersonalStatement from '../personal-statement'
import { connect } from 'react-redux'

export class UserProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showPrivat: true,
            showSchedule: false
        }
    }

    toggle = () => {
        this.setState((state) => ({
                    showPrivat: !this.state.showPrivat,
                    showSchedule: !this.state.showSchedule
                })
        )
    }

    selectPrivat = () => {
         this.setState({
                showPrivat: true,
                showSchedule: false
            })
    }

    selectSchedule = () => {
        this.setState({
                showPrivat: false,
                showSchedule: true
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
                        {this.props.is_tutor && 'Ведомость учеников'}
                        {!this.props.is_tutor && 'Мое расписание'}
                    </span>
            </div>
            {this.state.showPrivat && <PersonalData />}
            {!this.props.is_tutor && this.state.showSchedule && <PersonalSchedule />}
            {this.props.is_tutor && this.state.showSchedule && <PersonalStatement />}
        </section>
    )
}

function mapStateToProps(state) {
    return {
      is_tutor: state.is_tutor
    };
  }

export default connect(mapStateToProps)(UserProfile)