import React from 'react';

import { auth } from '../firebase';

const INITIAL_STATE = {
    email: '',
    fname: '',
    lname: '',
    password: '',
    confirmPassword: '',
    error: '',
}

export class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    }

    cancelSignUp = (e) => {
        console.log("cancel Sign Up");
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

        return <div style={styles.loginForm}>
                    <div style={styles.title}>Sign up</div>
                    <form onSubmit={this.handleSignUp}>
                        <input style={styles.input} placeholder="First Name" type='text' value={fname} onChange={event => this.handleChange('fname', event.target.value)} />
                        <input style={styles.input} placeholder="Last Name" type='text' value={lname} onChange={event => this.handleChange('lname', event.target.value)} />
                        <input style={styles.input} placeholder="Email" type='text' value={email} onChange={event => this.handleChange('email', event.target.value)} />
                        <input style={styles.input} placeholder="Password" type='password' value={password} onChange={event => this.handleChange('password', event.target.value)} />
                        <input style={styles.input} placeholder="Confirm Password" type='password' value={confirmPassword} onChange={event => this.handleChange('confirmPassword', event.target.value)} />
                        <div style={styles.loginRow}>
                            <button style={styles.cancel} type="button" onClick={this.cancelSignUp}>Cancel</button>
                            <button style={styles.submit} type="submit">Sign up</button>
                        </div>
                    </form>
                    
                </div>
    }
}

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
        marginBottom: '20px'
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '20px',
    },
}