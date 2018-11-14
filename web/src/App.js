import React, { Component } from 'react';
import { Login } from "../src/components/login";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: "no",
    }
  }

  handleLogin = (email, password) => {
    this.setState({login: "yes"});
    console.log(email, password);
  }

  render() {
    const { login } = this.state;

    let renderContent;

    if (login === "no") {
      renderContent = <Login handleLogin={this.handleLogin}/>
    } else if (login === "yes") {
      renderContent = <React.Fragment>
        Congradulations You logged In
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
