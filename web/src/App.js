import React, { Component } from 'react';
import { Login } from "../src/components/login";
import { firebase } from './firebase';

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

    if (authUser === null) {
      renderContent = <Login handleLogin={this.handleLogin}/>
    } else if (authUser) {
      renderContent = <React.Fragment>
        Congratulations You logged In
      </React.Fragment>
    } else {
      renderContent = <div>
        Something went wrong, you shouldn't see this.
      </div>
    }

    return <React.Fragment>{renderContent}</React.Fragment>
  }
}

export default App;
