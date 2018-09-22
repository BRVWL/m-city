import React, { Component } from 'react';
import { firebase } from '../../firebase';
import Fileuploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUploader extends Component {
  state = {
    name: '',
    isUploading: false,
    fileUrl: ''
  };

  static getDerivedStateFromProps(props, state) {
    const { defaultImg, defaultImgName, resetImg, storeFileName } = props;
    if (defaultImg) {
      return (state = {
        name: defaultImgName,
        fileUrl: defaultImg
      });
    }
    return null;
  }

  handleUploadStart = () => {};
  handleUploadError = () => {};
  handleUploadSuccess = () => {};

  render() {
    const { tag, dir } = this.props;
    return (
      <div>
        {!this.state.fileUrl ? (
          <div>
            <div className="label_input">{tag}</div>
            <Fileuploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default FileUploader;
