import React from "react";
import { SignUp } from './signUp';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            signUp: false,
        }
    }

    handleChange = (name) => e => {
        e.preventDefault();
        this.setState({[name]: e.currentTarget.value});
    }

    handleLogin = () => {
        this.props.handleLogin(this.state.email, this.state.password);
    }

    handleSignUp = () => {
        this.setState({signUp: !this.state.signUp});
    }

    render() {
        const { signUp } = this.state;

        return (
            <div style={styles.loginContainer}>
                <div style={styles.loginLeftPanel}>
                    <img style={styles.logo} alt="DASI Team Logo"/>
                </div>
                <div style={styles.seperator}/>
                <div style={styles.loginRightPanel}>
                    {
                        signUp ? 
                        <SignUp handleSignUp={this.handleSignUp} />
                        :
                        <div style={styles.loginForm}>
                            <div style={styles.title}>Login</div>
                            <input style={styles.input} placeholder="Email" type='text' value={this.state.email} onChange={this.handleChange('email')} />
                            <input style={styles.input} placeholder="password" type='password' value={this.state.password} onChange={this.handleChange('password')} />
                            <div style={styles.loginRow}>
                                <div style={styles.forgot}>Forgot Password</div>
                                <div style={styles.submit} onClick={this.handleLogin}>Sign In</div>
                            </div>
                            <div style={styles.signUp} onClick={this.handleSignUp}>Sign Up</div>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }
}

const styles = {
    loginContainer: {
      position: "absolute",
      top: 0, right: 0, left: 0, bottom: 0,
      background: "#FFF",
      display: 'flex',
      alignItems: "center",
    },
    loginLeftPanel: {
      width: 'calc(50% - 1px)',
      position: 'relative',
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    logo: {
        border: "1px solid grey",
        height: '200px',
        width: '200px',
    },
    seperator: {
        backgroundColor: "#000",
        height: '50%',
        width: '2px',
    },
    loginRightPanel: {
      width: 'calc(50% - 1px)',
      position: 'relative',
      boxSizing: "border-box",
      display: 'flex',
      justifyContent: 'center',
    },
    loginForm: {
        width: '300px',
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        height: '25px',
        marginBottom: '20px',
    },
    loginRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    forgot: {
        fontSize: '0.7rem',
        cursor: 'pointer',
        display: 'inline-block',        
    },
    submit: {
        padding: "7px 12px",
        border: '1px solid grey',
        boxShadow: '2px 5px 5px 0px rgba(92,92,92,1)',
        cursor: 'pointer',
        display: 'inline-block',
    },
    signUp: {
        padding: "7px 12px",
        border: '1px solid grey',
        boxShadow: '2px 5px 5px 0px rgba(92,92,92,1)',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'center'
    }
}