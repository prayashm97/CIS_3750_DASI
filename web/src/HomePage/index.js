import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Upload from '../components/Upload';

const styles = theme => ({
  root: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '80%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonDiv: {
    display: 'flex',
    justifyContent:'flex-end',
  }
});

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // login: "no",
      // authUser: null,
    }
  }

  // handleLogin = (email, password) => {
  //   this.setState({login: "yes"});
  // }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.buttonDiv}>
          <Button variant="contained" className={classes.button}>Create New Project</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
