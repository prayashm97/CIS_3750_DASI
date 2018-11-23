import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
  }
});


class ScreenItem extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      raised: false
    }
  }

  onMouseOver = () => this.setState({ shadow: 3 });
  onMouseOut = () => this.setState({ shadow: 1 });
  toggleRaised = () => this.setState({raised:!this.state.raised});


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
    </Card>
    );
  }
}

export default withStyles(styles)(ScreenItem);
