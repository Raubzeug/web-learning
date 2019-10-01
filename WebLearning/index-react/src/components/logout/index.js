import React from 'react';
import { Redirect } from 'react-router'
import fetchData from '../../js/fetchData'
import { connect } from 'react-redux'
import { setLoggedOut } from '../../js/actions/'

class Logout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            logout: false
        }
    }

    componentDidMount = () => {

        fetchData('/api/auth/logout/', {logout: true}, 'POST')
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    localStorage.setItem('logged_in', false);
                    this.setState({logout: true})
                    this.props.setLoggedOut()
                }
            })
            .catch(err => console.log(err))
    }

    render = () => {
        if (!this.state.logout) {
            return <div>Logging out...</div>
        }
        if (this.state.logout) {
            return <Redirect to='/' />
        }
    }
}

export default connect(null, { setLoggedOut })(Logout)