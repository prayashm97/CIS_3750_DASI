import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CloudUpload from '@material-ui/icons/CloudUpload';
// import Thumbnail from './Thumbnail';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';

import { withStyles } from '@material-ui/core/styles';

// const UPLOAD_URL = `https://upload-hub.herokuapp.com`;
const UPLOAD_URL = `http://localhost:3005`;


const styles = theme => ({
  dropzoneDiv: {
    padding:'15px', display: 'flex', justifyContent: 'center', alignItems: 'center'
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

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      files: [], 
      open: false, 
      images: [],
      uploading: false,
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  onDrop(files) {
    this.setState({
      files
    });

    const files2 = Array.from(files)
    this.setState({ uploading: true })

    //Builds the body for the POST call
    const formData = new FormData()
    files2.forEach((file, i) => {
      formData.append(i, file)
    })

    fetch(`${UPLOAD_URL}/upload_image`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      console.log(images);
      const temp = images.files;
      this.props.addImage(images.files);
      this.setState({
        images: [...this.state.images, ...temp],
        uploading: false,
        open: false
      })
    })

  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  render() {
    const { open, uploading } = this.state;
    const { classes } = this.props;

    return (
      <section>
        <Dialog maxWidth={'xs'} fullWidth open={open} onClose={this.handleClose}>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogContent>
            <LoadingOverlay style={{ width: '100%', height: '100%' }}>
            <Loader loading={uploading} />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className="dropzone">
                  <Dropzone
                    accept="image/*"
                    onDrop={this.onDrop.bind(this)}
                    onFileDialogCancel={this.onCancel.bind(this)}
                    multiple
                  >
                    <div className={classes.dropzoneDiv}>
                      <CloudUpload classes={{fontSizeLarge: classes.icon}} fontSize={'large'} />
                    </div>
                    <div style={{ padding:'15px'}}>
                      <p>Drop Image to Upload</p>
                      <p>Or Click Here</p>
                    </div>
                  </Dropzone>
                </div>
              </div>
              </LoadingOverlay>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.uploadButton} onClick={this.handleClick}>
          <Icon className={classes.icon}>
            add_circle
          </Icon>
        </div>
      </section>
    );
  }
}

export default withStyles(styles)(Upload);
