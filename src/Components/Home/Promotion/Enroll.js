import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../UI/formFields';
import { validate, firebaseLooper } from '../../UI/misc';
import { reqToFirebase } from '../../../firebase';

class Enroll extends Component {
  state = {
    formError: false,
    formSucces: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ''
      }
    }
  };

  resetFormSuccess = type => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      newFormData[key].value = '';
      newFormData[key].valid = false;
      newFormData[key].validationMessage = '';
    }
    this.setState({
      formData: newFormData,
      formError: false,
      formSucces: type ? 'Success' : 'Already in DB'
    });
    this.succesMessage();
  };

  succesMessage = () => {
    setTimeout(() => {
      this.setState({
        formSucces: ''
      });
    }, 3000);
  };

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }
    if (formIsValid) {
      reqToFirebase('promotions')
        .orderByChild('email')
        .equalTo(dataToSubmit.email)
        .once('value')
        .then(res => {
          if (res.val() === null) {
            reqToFirebase('promotions').push(dataToSubmit.email);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });

      this.resetFormSuccess();
    } else {
      this.setState({
        formError: true
      });
    }
  };

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

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={this.submitForm}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField id="email" formData={this.state.formData.email} onChangeField={this.onChangeField} />
              {this.state.formError ? <div className="error_label">Something is wrong, try again!</div> : null}
              <div className="success_label">{this.state.formSucces}</div>
              <button onClick={this.submitForm}>Enroll</button>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
