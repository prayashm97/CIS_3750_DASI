import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { auth } from '../firebase';

const INITIAL_STATE = {
    email: '',
    fname: '',
    lname: '',
    password: '',
    confirmPassword: '',
    error: '',
}

const style = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    }

    cancelSignUp = (e) => {
        console.log("cancel Sign Up");
        this.props.handleSignUp();
    }

    handleSignUp = (e) => {
        const {
            fname,
            lname,
            email,
            password,
        } = this.state;
        
        auth.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
            }).then(console.log(fname+' '+lname))
            .catch(error => {
                this.setState(this.handleChange('error', error));
                console.log(error);
            });

            e.preventDefault();
    }

    render() {

        const {
            fname,
            lname,
            email,
            password,
            confirmPassword,
        } = this.state;

        const {
          classes
        } = this.props;

        return <div style={styles.loginForm}>
                    <div>
                    <Typography component="h2" variant="h2" gutterBottom>
                      Sign up
                    </Typography>
                    </div>
                    <form onSubmit={this.handleSignUp}>
                    <TextField
                      id="fname"
                      label="First Name"
                      value={fname}
                      onChange={event => this.handleChange('fname', event.target.value)}
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      id="lname"
                      label="Last Name"
                      value={lname}
                      onChange={event => this.handleChange('lname', event.target.value)}
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      margin="normal"
                    />
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
                    <TextField
                      id="confirmPassword"
                      label="Confirm Password"
                      value={confirmPassword}
                      onChange={event => this.handleChange('confirmPassword', event.target.value)}
                      type="password"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      margin="normal"
                    />
                      <div style={styles.loginRow}>
                        <Button className={classes.button} onClick={this.cancelSignUp}>Cancel</Button>
                        <Button variant="contained" type="submit" className={classes.button}>
                          Sign Up
                        </Button>
                      </div>
                    </form>
                    
                </div>
    }
}

export default withStyles(style)(SignUp);


const styles = {
    cancel: {
        padding: "7px 12px",
        border: '1px solid grey',
        boxShadow: '2px 5px 5px 0px rgba(92,92,92,1)',
        display: 'inline-block',
        marginRight: '10px',
        cursor: 'pointer',
        fontSize: '0.9em',
    },
    submit: {
        padding: "7px 12px",
        border: '1px solid grey',
        boxShadow: '2px 5px 5px 0px rgba(92,92,92,1)',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '0.9em',
    },
    input: {
        width: '100%',
        height: '25px',
        marginBottom: '20px',
    },
    loginForm: {
        width: '300px',
    },
    loginRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '20px'
    },
    title: {
      fontSize: '3em',
      marginBottom: '0.25em',
      fontWeight: '200',
    },
}