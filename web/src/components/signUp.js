import React from 'react';

export class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            fName: '',
            lName: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleChange = (name) => e => {
        this.setState({[name]: e.currentTarget.value});
    }

    handleSignUp = () => e => {
        console.log("Signing up");
    }

    render() {
        return <div style={styles.loginForm}>
                    <div style={styles.title}>Sign up</div>
                    <input style={styles.input} placeholder="First Name" type='text' value={this.state.fname} onChange={this.handleChange('fname')} />
                    <input style={styles.input} placeholder="Last Name" type='text' value={this.state.lname} onChange={this.handleChange('lname')} />
                    <input style={styles.input} placeholder="Email" type='text' value={this.state.email} onChange={this.handleChange('email')} />
                    <input style={styles.input} placeholder="Password" type='password' value={this.state.password} onChange={this.handleChange('password')} />
                    <input style={styles.input} placeholder="Confirm Password" type='password' value={this.state.confirmPassword} onChange={this.handleChange('confirmPassword')} />
                    <div style={styles.loginRow}>
                        <div style={styles.cancel} onClick={this.props.handleSignUp}>Cancel</div>
                        <div style={styles.submit} onClick={this.handleSignUp}>Sign up</div>
                    </div>
                    
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
    },
    submit: {
        padding: "7px 12px",
        border: '1px solid grey',
        boxShadow: '2px 5px 5px 0px rgba(92,92,92,1)',
        cursor: 'pointer',
        display: 'inline-block',
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