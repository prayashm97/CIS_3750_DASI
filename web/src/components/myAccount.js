import React from "react";
import { withStyles } from '@material-ui/core/styles';
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
//import AccountCircle from '@material-ui/icons/AccountCircle';
//import Switch from '@material-ui/core/Switch';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormGroup from '@material-ui/core/FormGroup';
//import MenuItem from '@material-ui/core/MenuItem';
//import Menu from '@material-ui/core/Menu';
import { auth } from '../firebase';

const style = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    loginRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '20px'
    },
    button: {
        margin: theme.spacing.unit,
    },

});

const INITIAL_STATE = {
    email: '',
    fname: '',
    lname: '',
    password: '',
    confirmPassword: '',
    error: '',
    message: '',
    anchorEl: null,
    changePassword: false,
}

class MyAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
    }

    cancelChanges = (e) => {
        this.props.onPageChange("project");
        console.log("cancel Changes");
        
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    handleSaveChanges = (e) => {
        if (this.state.password === this.state.confirmPassword && this.state.changePassword === true) {
            auth.doPasswordUpdate(this.state.password)
                .then(() => {
                    this.setState({ message: "Password successfully changed." }); 
                }).catch(error => {
                    this.setState({ message: error.message });
                });
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ message: "Passwords do not match"});
        }
        
        e.preventDefault();
    }

    handleChangePassword = () => {
        this.setState((state) => ({
            changePassword: !state.changePassword
        }));
    }

    render() {
        const { classes } = this.props;

        const {
            fname,
            lname,
            email,
            password,
            confirmPassword,
            changePassword,
            message,
        } = this.state;

        return (
            <div className={classes.root}>
                <form onSubmit={this.handleSaveChanges}>
                    <Button variant="contained" className={classes.button} onClick={this.cancelChanges}>{"<"} Back</Button>
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
                    {changePassword &&
                        <TextField
                            id="password"
                            label="New Password"
                            value={password}
                            onChange={event => this.handleChange('password', event.target.value)}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                        />
                    }
                    {changePassword &&
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={event => this.handleChange('confirmPassword', event.target.value)}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                        /> 
                    }
                    {message &&
                        <p>
                            {message}
                        </p>
                    }
                    <div style={style.loginRow}>
                        <Button className={classes.button} onClick={this.handleChangePassword}>Change Password</Button>
                        <Button variant="contained" type="submit" className={classes.button}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}


export default withStyles(style)(MyAccount);
