import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../UI/formFields';
import { validate, firebaseLooper } from '../../UI/misc';
import { reqToFirebase, firebaseDB } from '../../../firebase';
import { messaging } from 'firebase';

class AddEditMatch extends Component {
  state = {
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    teams: [],
    formData: {
      date: {
        element: 'input',
        value: '',
        config: {
          name: 'date_input',
          type: 'date',
          label: 'Event date'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      local: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          type: 'select',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      resultLocal: {
        element: 'input',
        value: '',
        config: {
          label: 'Result local',
          name: 'result_local_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      away: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          type: 'select',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      resultAway: {
        element: 'input',
        value: '',
        config: {
          label: 'Result local',
          name: 'result_local_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      referee: {
        element: 'input',
        value: '',
        config: {
          name: 'referee_input',
          type: 'text',
          label: 'Referee'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      stadium: {
        element: 'input',
        value: '',
        config: {
          name: 'stadium_input',
          type: 'text',
          label: 'Stadium'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      result: {
        element: 'select',
        value: '',
        config: {
          label: 'Team result',
          name: 'result_select',
          type: 'select',
          options: [{ key: 'W', value: 'W' }, { key: 'L', value: 'L' }, { key: 'D', value: 'D' }, { key: 'n/a', value: 'n/a' }]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      final: {
        element: 'select',
        value: '',
        config: {
          label: 'Game played ?',
          name: 'final_select',
          type: 'select',
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }]
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
    const matchId = this.props.match.params.id;
    const getTeams = (match, type) => {
      reqToFirebase('teams')
        .once('value')
        .then(res => {
          const teams = firebaseLooper(res);
          const teamOptions = [];
          res.forEach(child => {
            teamOptions.push({
              key: child.val().shortName,
              value: child.val().shortName
            });
          });
          this.updateFields(match, teamOptions, teams, type, matchId);
        });
    };
    if (!matchId) {
      // ADD MATCH
    } else {
      // EDIT MATCH
      firebaseDB
        .ref(`matches/${matchId}`)
        .once('value')
        .then(res => {
          const match = res.val();
          getTeams(match, 'Edit Match');
        });
    }

    reqToFirebase('matches')
      .once('value')
      .then(res => {
        console.log('Res matches from serv', res.val());
      });
  }

  updateFields = (match, teamOptions, teams, type, matchId) => {
    const newFormData = { ...this.state.formData }; // make copy state formdata
    for (let key in newFormData) {
      if (match) {
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }
      if (key === 'local' || key === 'away') {
        newFormData[key].config.options = teamOptions;
      }
    }
    console.log('newFormData', newFormData);
    this.setState({
      matchId,
      formType: type,
      formData: newFormData,
      teams
    });
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

  handleSubmit = e => {
    e.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }
    this.state.teams.forEach(team => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit['localThmb'] = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit['awayThmb'] = team.thmb;
      }
    });
    if (formIsValid) {
      // code here
      if (this.state.formType === 'Edit Match') {
        firebaseDB
          .ref(`matches/${this.state.matchId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
          })
          .catch(error => this.setState({ formError: true }));
      } else {
        // add match
      }
    } else {
      this.setState({
        formError: true
      });
    }
  };

  successForm = message => {
    this.setState({
      formSuccess: message
    });
    setTimeout(() => {
      this.setState({
        formSuccess: ''
      });
    }, 2000);
  };

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
        </div>
        <div style={{ padding: 30 }}>
          <form onSubmit={this.handleSubmit}>
            <FormField id="date" formData={this.state.formData.date} onChangeField={this.onChangeField} />
            <div className="select_team_layout">
              <div className="label_inputs">Local</div>
              <div className="wrapper">
                <div className="left">
                  <FormField id="local" formData={this.state.formData.local} onChangeField={this.onChangeField} />
                </div>
                <div>
                  <FormField id="resultLocal" formData={this.state.formData.resultLocal} onChangeField={this.onChangeField} />
                </div>
              </div>
            </div>
            <div className="select_team_layout">
              <div className="label_inputs">Away</div>
              <div className="wrapper">
                <div className="left">
                  <FormField id="away" formData={this.state.formData.away} onChangeField={this.onChangeField} />
                </div>
                <div>
                  <FormField id="resultAway" formData={this.state.formData.resultAway} onChangeField={this.onChangeField} />
                </div>
              </div>
            </div>
            <div className="split_fields">
              <FormField id="referee" formData={this.state.formData.referee} onChangeField={this.onChangeField} />
              <FormField id="stadium" formData={this.state.formData.stadium} onChangeField={this.onChangeField} />
            </div>
            <div className="split_fields last">
              <FormField id="result" formData={this.state.formData.result} onChangeField={this.onChangeField} />
              <FormField id="final" formData={this.state.formData.final} onChangeField={this.onChangeField} />
            </div>
            <div className="success_label">{this.state.formSuccess}</div>
            {this.state.formError ? <div className="error_label">Something is wrong</div> : ''}
            <div className="admin_submit">
              <button onClick={this.handleSubmit}>{this.state.formType}</button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditMatch;
