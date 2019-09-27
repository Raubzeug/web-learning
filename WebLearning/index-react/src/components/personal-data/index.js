import React from 'react';
import './personal-data.less'
import getCookie from '../../js/getCookie'
import ProfileForm from './ProfileForm'

class PersonalData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {success: '', error: '', errors: [], applied: false}
        this.submitForm = this.submitForm.bind(this)
    }

    submitForm = event => {
        this.setState({success: '', error: '', errors: [], applied: false})
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
            }
        fetch('/api/auth/user/', {
            method: 'PUT',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(event),
            })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        success: 'Changes have been applied',
                        applied: true,
                    })
                }
                return response.json()})
                .then(data => {
                    if (!this.state.applied) {
                        for (var elem in data) {
                            this.setState({error: data[elem]})
                            this.setState(state => {
                                const errors = state.errors.concat(state.error)
                                return {
                                    errors,
                                    error: ''
                                }
                            })
                        }
                        }
                })
                .catch(err => console.error(err))        
    }

    render = () => (
                    <ProfileForm submit={this.submitForm} success={this.state.success}
                             errors={this.state.errors}/>
            )
}

export default PersonalData