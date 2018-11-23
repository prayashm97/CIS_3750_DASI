import React, { Component } from 'react';
import Login from "../src/components/login";
import HomePage from "./HomePage";

import { firebase } from './firebase';
import { auth } from '../src/firebase';
// import logo from './logo.svg';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: "no",
      authUser: null,
    }
  }

  handleLogin = (email, password) => {
       this.setState({login: "yes"});
  }
  
  handleLogout = () => {
      this.setState({
          authUser: null,
          login: "no",
      });
      auth.doSignOut();
  }

    componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    const { authUser } = this.state;
    let renderContent;

    if (authUser == null) {
        renderContent = <Login handleLogin={this.handleLogin}/>
    } else if (authUser) {
      renderContent = <HomePage onLogout={this.handleLogout}/>
    } else {
      renderContent = <div>
        Something went wrong, you shouldn't see this.
      </div>
    }

    return <React.Fragment>{renderContent}</React.Fragment>;
  }
}

export default App;
