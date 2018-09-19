import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../UI/formFields';
import { validate, firebaseLooper } from '../../UI/misc';
import { reqToFirebase, firebaseDB, firebase } from '../../../firebase';

class AddEditPlayrs extends Component {
  state = {
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
      }
    }
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      // add player
      this.setState({
        formType: 'Add Player'
      });
    } else {
    }
  }

  onChangeField = ({ e, id }) => {
    const { value } = e.target;
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
      // code here
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={this.handleSubmit}>
              <FormField id="name" formData={this.state.formData.name} onChangeField={this.onChangeField} />
              <FormField id="lastname" formData={this.state.formData.lastname} onChangeField={this.onChangeField} />
              <FormField id="number" formData={this.state.formData.number} onChangeField={this.onChangeField} />
              <FormField id="position" formData={this.state.formData.position} onChangeField={this.onChangeField} />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? <div className="error_label">Something is wrong</div> : ''}
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
