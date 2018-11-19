import React, { Component } from 'react';
import { Login } from "../src/components/login";
import { firebase } from './firebase';
import logo from './logo.svg';
import Upload from './Upload'
import './App.css';

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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          This is just a testing thing.
        </p>
        <Upload />
      </div>
    }

    return <React.Fragment>{renderContent}</React.Fragment>
  }
}

export default App;
