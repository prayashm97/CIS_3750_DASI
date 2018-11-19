import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


import CloudUpload from '@material-ui/icons/CloudUpload';

import { withStyles } from '@material-ui/core/styles';

import Thumbnail from './Thumbnail';
const UPLOAD_URL = `http://localhost:3005`;

const styles = theme => ({
  dropzoneDiv: {
    padding:'15px', display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  icon: {
    fontSize: '50px'
  }
});

class Upload extends Component {
  constructor() {
    super()
    this.state = { files: [], open: false, images: []}
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
      const temp = `${UPLOAD_URL}${images.filepath}`
      this.setState({
        images: [...this.state.images, temp],
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
    const { open } = this.state;
    const { classes } = this.props;

    return (
      <section>
       
        

        <Dialog maxWidth={'sm'} fullWidth open={open} onClose={this.handleClose}>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogContent>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div className="dropzone">
                <Dropzone
                  accept="image/*"
                  onDrop={this.onDrop.bind(this)}
                  onFileDialogCancel={this.onCancel.bind(this)}
                  multiple={false}
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
            
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained" color="secondary" onClick={this.handleClick}>
          Upload Image Button
        </Button>

        {this.state.images.length > 0 ?

          <aside>
            <h2>Uploaded images</h2>
            <div className={classes.dropzoneDiv}>
              {
                  this.state.images.map((f, i) => <Thumbnail key={i} src={f} />)
              }
            </div>
          </aside>
          : <div></div>
        }
       

      </section>
    );
  }
}

export default withStyles(styles)(Upload);
