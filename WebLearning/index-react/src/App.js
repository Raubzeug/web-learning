import React from 'react';
import { Route, Switch } from "react-router-dom";
import Header from './components/header'
import Footer from './components/footer'
import IndexContent from './components/index-page'
import LoginContent from './components/login-page'
import Logout from './components/logout'
import RegistrationContent from './components/registration-page'
import UserProfile from './components/user-profile'

class App extends React.Component {
 
  componentDidMount = () => {
    // console.log('here', this.props.user_info)
  }
  
  render = () => (
    <div className="body-wrapper">
      <Header />
      <Switch>
        <Route exact path="/" component={IndexContent} />
        <Route exact path="/login" component={LoginContent} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/registration" component={RegistrationContent} />
        <Route exact path="/profile" component={UserProfile} />
      </Switch>
      <Footer />
    </div>
  )
};

export default App