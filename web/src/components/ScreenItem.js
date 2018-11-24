import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import Eye from '@material-ui/icons/RemoveRedEye';
import Edit from '@material-ui/icons/Edit';
import FileCopy from '@material-ui/icons/FileCopy';

import Typography from '@material-ui/core/Typography';

import Thumbnail from './Thumbnail';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  dropzoneDiv: {
    padding:'15px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', 
  },
  root: {
    // borderStyle: 'solid',
    marginBottom: '40px'
  },
  icon: {
    fontSize: '50px'
  },
  uploadButton: {
    display: "flex", justifyContent: "center", alignItems: "center",
    height: "150px", width: "200px",
    border: "1px solid #000",
    cursor: "pointer",
  },
  button: {
    margin: theme.spacing.unit,
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
    color: "#fff",
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    color: "#fff",
  },
  iconSmall: {
    fontSize: 20,
  },
  hover: {
    position: "absolute",
    top: 0, bottom: 0, right: 0, left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: "4px",
    opacity: "1",
    transition: "all 0.5s ease-in-out",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    color: "#fff",
  },
  noHover: {
    position: "absolute",
    top: 0, bottom: 0, right: 0, left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: "4px",
    opacity: "0",
    transition: "all 0.5s ease-in-out",
    display: "flex",
    justifyContent: "space-around",
    color: "#fff",
    alignItems: "center",
  },
  slideContainer: {
    position: "relative",
    borderRadius: "4px",
  },
});


class ScreenItem extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      raised: false,
      hover: false,
    }
  }

  previewClick = () => {
    console.log("previewClick", this.props.item._id)
    this.props.previewPage(this.props.item);
  }

  editClick = () => {
    this.props.editPage(this.props.item);
    console.log("editClick", this.props.item._id)
  }

  duplicateClick = () => {
    console.log("duplicateClick", this.props.item._id)
  }

  deleteClick = () => {
    console.log("deleteClick", this.props.item._id)
    const query = JSON.stringify({
      query: `mutation {
        removeScreen(_id: "${this.props.item._id}") {
          _id name doneBy { _id } slides timing
        }
      }
      `
    });
    fetch(process.env.REACT_APP_GRAPHQL_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: query,
    })
    .then(res => res.json())
    .then(({data})=> {
    console.log(data);
    this.props.refreshPage();
    })
  }

  render() {
    const { item, classes } = this.props;
    const { hover } = this.state;

    return (
      <React.Fragment>
        <Typography gutterBottom variant="h5" component="h3">
          {item.name}
        </Typography>
        <div className={classes.slideContainer}>
          <div className={classes.dropzoneDiv}> {
            item.slides.slice(0, 4).map((slide, index) => <Thumbnail key={index} src={slide} />)
          }
          </div>
          <div className={hover ? classes.hover : classes.noHover} onMouseLeave={() => {this.setState({hover: false})}} onMouseEnter={() => {this.setState({hover: true})}}>
            <Button color="inherit" className={classes.button} onClick={() => this.previewClick()}>
              <Eye className={classes.leftIcon} />
              Preview
            </Button>
            <Button color="inherit" className={classes.button} onClick={() => this.editClick()}>
              <Edit className={classes.leftIcon} />
              Edit
            </Button>
            <Button color="inherit" className={classes.button} onClick={() => this.duplicateClick()} >
              <FileCopy className={classes.leftIcon} />
              Duplicate
            </Button>
            <Button color="inherit" className={classes.button} onClick={() => this.deleteClick()}>
              <DeleteIcon className={classes.leftIcon} />
              Delete
            </Button>
          </div>
        </div>
      </React.Fragment>
    )
  }

  /*
  render() {
    const { item, classes } = this.props;
    return (
      <Card 
      className={classes.root}
      onMouseOver={this.toggleRaised} 
      onMouseOut={this.toggleRaised} 
      raised={this.state.raised} 
      >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          {item.name}
        </Typography>
        <div className={classes.dropzoneDiv}> {
          item.slides.slice(0, 4).map((f, i) => <Thumbnail key={i} src={f} />)
        }
        </div>
      </CardContent>
      <CardActions>
        <Button fullWidth color="default" className={classes.button} onClick={() => this.previewClick()}>
          <Eye className={classes.leftIcon} />
          Preview
        </Button>

        <Button fullWidth color="default" className={classes.button} onClick={() => this.editClick()}>
          <Edit className={classes.leftIcon} />
          Edit
        </Button>

        <Button fullWidth color="default" className={classes.button} onClick={() => this.duplicateClick()} >
          <FileCopy className={classes.leftIcon} />
          Duplicate
        </Button>

        <Button fullWidth color="default" className={classes.button} onClick={() => this.deleteClick()}>
          <DeleteIcon className={classes.leftIcon} />
          Delete
        </Button>
      </CardActions>
    </Card>
    );
  } */
}

export default withStyles(styles)(ScreenItem);
