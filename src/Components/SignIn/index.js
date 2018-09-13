import React, { Component } from 'react';
import FormField from '../UI/formFields';
import { validate } from '../UI/misc';
import { firebase } from '../../firebase';

class SignIn extends Component {
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
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ''
      }
    }
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
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(res => {
          this.props.history.push('/dashboard');
        })
        .catch(error => {
          this.setState({
            formError: true
          });
        });
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
      <div className="container">
        <div className="signin_wrapper" style={{ margin: '100px' }}>
          <form onSubmit={this.handleSubmit}>
            <h2>Please login</h2>
            <FormField id="email" formData={this.state.formData.email} onChangeField={this.onChangeField} />
            <FormField id="password" formData={this.state.formData.password} onChangeField={this.onChangeField} />
            {this.state.formError ? <div className="error_label">Something is wrong, try again!</div> : null}
            <button onClick={this.handleSubmit}>Log in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
