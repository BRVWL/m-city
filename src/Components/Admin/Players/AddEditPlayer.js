import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../UI/formFields';
import { validate, firebaseLooper } from '../../UI/misc';
import FileUploader from '../../UI/fileUploader';
import { reqToFirebase, firebaseDB, firebase } from '../../../firebase';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';

class AddEditPlayrs extends Component {
  state = {
    loading: true,
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'player_input',
          type: 'text',
          label: 'Player name'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          label: 'Player last name'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      number: {
        element: 'input',
        value: '',
        config: {
          name: 'number_input',
          type: 'text',
          label: 'Player number'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a position',
          name: 'select_position',
          type: 'select',
          options: [
            {
              key: 'Keeper',
              value: 'Keeper'
            },
            {
              key: 'Defence',
              value: 'Defence'
            },
            {
              key: 'Midfield',
              value: 'Midfield'
            },
            {
              key: 'Striker',
              value: 'Striker'
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true
        },
        valid: false
      }
    }
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      // add player
      this.setState({
        formType: 'Add Player',
        loading: false
      });
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once('value')
        .then(res => {
          const playerData = res.val();
          firebase
            .storage()
            .ref('players')
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, 'Edit player', url);
            })
            .catch(error => {
              this.updateFields(
                { ...playerData, image: '' },
                playerId,
                'Edit player',
                ''
              );
            });
        });
    }
  }

  updateFields = (playerData, playerId, type, defaultImg) => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      newFormData[key].value = playerData[key];
      newFormData[key].valid = true;
    }
    this.setState({
      playerId,
      formType: type,
      formData: newFormData,
      defaultImg,
      loading: false
    });
  };

  onChangeField = ({ e, id }, content = '') => {
    const value = _.get(e, 'target.value', content);
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [id]: {
          ...prevState.formData[id],
          value,
          valid: validate(prevState.formData[id], value)[0],
          validationMessage: validate(prevState.formData[id], value)[1]
        }
      },
      formError: false
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }
    if (formIsValid) {
      if (this.state.formType === 'Edit player') {
        // Edit
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.setState(
              {
                formSuccess: 'Updated correctly'
              },
              () =>
                setTimeout(() => {
                  this.setState({
                    formSuccess: ''
                  });
                }, 2000)
            );
          })
          .catch(error => {
            this.setState({
              formError: true
            });
          });
      } else {
        // Add
        reqToFirebase('players')
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_players');
          })
          .catch(error => {
            this.setState({
              formError: true
            });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  };

  resetImage = () => {
    this.setState(prevState => ({
      defaultImg: '',
      formData: {
        ...prevState.formData,
        image: {
          element: 'image',
          value: '',
          validation: {
            required: true
          },
          valid: false
        }
      }
    }));
  };

  storeFileName = fileName => {
    this.onChangeField({ id: 'image' }, fileName);
  };

  render() {
    return this.state.loading ? (
      <AdminLayout>
        <div
          style={{
            textAlign: 'center',
            margin: '30px'
          }}>
          <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
        </div>
      </AdminLayout>
    ) : (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={this.handleSubmit}>
              <FileUploader
                dir="players"
                tag="Player image"
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImg={this.resetImage}
                storeFileName={this.storeFileName}
              />
              <FormField
                id="name"
                formData={this.state.formData.name}
                onChangeField={this.onChangeField}
              />
              <FormField
                id="lastname"
                formData={this.state.formData.lastname}
                onChangeField={this.onChangeField}
              />
              <FormField
                id="number"
                formData={this.state.formData.number}
                onChangeField={this.onChangeField}
              />
              <FormField
                id="position"
                formData={this.state.formData.position}
                onChangeField={this.onChangeField}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something is wrong</div>
              ) : (
                ''
              )}
              <div className="admin_submit">
                <button onClick={this.handleSubmit}>{this.state.formType}</button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayrs;
