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
    const { defaultImg, defaultImgName } = props;
    if (defaultImg) {
      return (state = {
        name: defaultImgName,
        fileUrl: defaultImg
      });
    }
    return null;
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true });
  };

  handleUploadError = () => {
    this.setState({ isUploading: false });
  };

  handleUploadSuccess = filename => {
    this.setState({
      name: filename,
      isUploading: false
    });
    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(res => {
        this.setState({ fileUrl: res });
      });
    this.props.storeFileName(filename);
  };

  uploadAgain = () => {
    this.setState({
      name: '',
      isUploading: false,
      fileUrl: ''
    });
    this.props.resetImg();
  };

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
        {this.state.isUploading ? (
          <div
            className="progress"
            style={{
              textAlign: 'center',
              margin: '30 px'
            }}>
            <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
          </div>
        ) : null}
        {this.state.fileUrl ? (
          <div className="image_upload_container">
            <img src={this.state.fileUrl} style={{ width: '100%' }} />
            <div className="remove" onClick={this.uploadAgain}>
              Remove
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FileUploader;
