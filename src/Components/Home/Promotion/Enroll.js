import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../UI/formFields';

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

  submitForm = e => {};

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={this.submitForm}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField id="email" formData={this.state.formData.email} />
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
