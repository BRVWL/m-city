import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../UI/formFields';
import { validate } from '../../UI/misc';

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

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }
    if (formIsValid) {
      console.log('Submit', dataToSubmit);
    } else {
      this.setState({
        formError: true
      });
    }
  };

  onChangeField = ({ e, id }) => {
    const { value } = e.target;
    // this.setState({
    //   formData: {
    //     ...this.state.formData,
    //     [id]: {
    //       ...this.state.formData.email,
    //       value: validate(value)
    //     }
    //   }
    // });
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[id] };
    newElement.value = value;
    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormData[id] = newElement;
    this.setState({
      formError: false,
      formData: newFormData
    });
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
              <button onClick={this.submitForm}>Enroll</button>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
