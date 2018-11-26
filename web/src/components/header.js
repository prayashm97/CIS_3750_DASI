import React from "react";
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownSharp from '@material-ui/icons/ArrowDropDownSharp';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { auth } from '../firebase';

const style = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
	short: {
		flexGrow: 1,
        maxWidth: 50,
        cursor: 'pointer',
	},
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    rightPanel: {
        display: 'flex',
        justifyContent:'flex-end',
        alignItems: "center",
        height: "100%",
    },
    buttonDiv: {
        display: 'flex',
        justifyContent:'flex-end',
        marginRight: "5px",
    },
    logo: {
        maxWidth: "50px",
        maxHeight: "50px",
    },
    headerContainer: {
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 50px",
        background: "#d4d4d4",
        position: "fixed",
        top: 0, left: 0, right: 0, zIndex: 1000,
    }
};

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };
    }

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleSignOut = () => {
        //sign out
        auth.doSignOut();
		//this.props.onLogout();
        this.handleClose();
    };

    handleMyAccount = () => {
        this.props.onPageChangeAccount();
        this.handleClose();
    };
	
	handleHome = (e) => {
		this.props.onPageChangeHome();
	}

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <div className={classes.headerContainer}>
                    <img className={classes.logo} src="DASI_logo.png" alt="DASI Team Logo" />
                    <div className={classes.rightPanel}>
                        {this.props.page === "homepage" ? <div className={classes.buttonDiv}>
                            <Button onClick={this.props.createProject} variant="contained" className={classes.button}>
                            Create New Project
                            </Button>
                        </div> : null }
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                            <ArrowDropDownSharp />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleMyAccount}>My account</MenuItem>
                            <MenuItem onClick={this.handleSignOut}>Sign out</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        );
    }
}


export default withStyles(style)(Header);