import React from "react";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
//import Switch from '@material-ui/core/Switch';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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
	},
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };
        this.handleMyAccount = this.handleMyAccount.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);
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

    handleSignOut = (e) => {
        //sign out
		this.props.onLogout(e.target.value);
        this.handleClose();
    };

    handleMyAccount = (e) => {
        this.props.onPageChange(e.target.value);
        this.handleClose();
    };
	
	handleHome = (e) => {
		this.props.onPageChange(e.target.value);
	}

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.short} onClick={this.handleHome}>
                            DASI
                        </Typography>
						<Typography variant="h6" color="inherit" className={classes.grow} onClick={this.handleHome}>
                            
                        </Typography>
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
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
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


export default withStyles(style)(Header);