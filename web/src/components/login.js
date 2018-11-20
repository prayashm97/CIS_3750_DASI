import React from "react";
import SignUp from './signUp';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { auth } from '../firebase';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    signUp: false,
};


const style = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    handleLogin = (event) => {
        const {
            email,
            password,
        } = this.state;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState(this.handleChange('error', error));
            });

        event.preventDefault();
    }

    handleSignUp = () => {
        this.setState({ signUp: !this.state.signUp });
    }

    render() {
        const {
            email,
            password,
            signUp,
        } = this.state;
        const {
          classes
      } = this.props;
        return (
            <div style={styles.loginContainer}>
                <div style={styles.loginLeftPanel}>
                    <img src="https://s3.amazonaws.com/cis3750dasi/DASI_logo.png" alt="DASI Team Logo" />
                </div>
                <div style={styles.seperator} />
                <div style={styles.loginRightPanel}>
                    {
                        signUp ?
                            <SignUp handleSignUp={this.handleSignUp} />
                            :
                            <form onSubmit={this.handleLogin} style={styles.loginForm}>
                                <div>
                                <Typography component="h2" variant="h2" gutterBottom>
                                  Login
                                </Typography>
                                </div>
                                <TextField
                                  id="email"
                                  label="Email"
                                  value={email}
                                  onChange={event => this.handleChange('email', event.target.value)}
                                  type="email"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  fullWidth
                                  margin="normal"
                                />
                                <TextField
                                  id="password"
                                  label="Password"
                                  value={password}
                                  onChange={event => this.handleChange('password', event.target.value)}
                                  type="password"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  fullWidth
                                  margin="normal"
                                />
                                <div style={styles.loginRow}>
                                  <Button className={classes.button}>Forgot Password</Button>
                                  <Button variant="contained" type="submit" className={classes.button}>
                                    Sign In
                                  </Button>
                                </div>
                                <Button fullWidth variant="contained" type="reset" className={classes.button} onClick={this.handleSignUp}>
                                  Sign Up
                                </Button>
                            </form>
                    }

                </div>
            </div>
        )
    }
}

export default withStyles(style)(Login);


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
        alignItems: "center",
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
      fontSize: '3em',
      marginBottom: '0.25em',
      fontWeight: '200',
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
        marginBottom: '20px',
        marginTop: '20px'
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
        fontSize: '0.9em',
    },
    signUp: {
        padding: "7px 12px",
        border: '1px solid grey',
        boxShadow: '2px 5px 5px 0px rgba(92,92,92,1)',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'center',
        fontSize: '0.9em',
    }
}