import ImageGallery from 'react-image-gallery';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import "react-image-gallery/styles/css/image-gallery.css";
const styles = theme => ({
  root: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '80%',
    marginTop: '50px',
  },

});
class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      // authUser: null,
    }

  }
 
  componentDidMount() {
    const temp = this.props.project.slides.map((f) => {
      return {
        original: f,
        thumbnail: f,
      }
    })
    this.setState({
      images: temp
    }, () => {
      this.openFullScreen();
    })

  }

  openFullScreen = () => {
    this._imageGallery.fullScreen()
  };
  
  render() {
    // this._imageGallery.fullScreen();
    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]
 
    return (
      <ImageGallery ref={i => this._imageGallery = i} useBrowserFullscreen items={this.state.images} showNav={false} showThumbnails={false} showPlayButton={false} autoPlay={true} slideInterval={this.props.timing || 3000} />
    );
  }
 
}

export default withStyles(styles)(Preview);