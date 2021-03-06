import React from 'react';
import './personal-data.less'
import fetchData from '../../services/fetchData'
import ProfileForm from './ProfileForm'

class PersonalData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {success: '', error: '', errors: [], applied: false}
    }

    submitForm = event => {
        this.setState({success: '', error: '', errors: [], applied: false})
        fetchData('/api/auth/user/', event, 'PUT', true)
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