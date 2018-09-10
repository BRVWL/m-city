import React, { Component } from 'react';
import { reqToFirebase } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../UI/misc';

class Blocks extends Component {
  state = {
    matches: []
  };

  componentDidMount() {
    this.makeReq('matches');
  }

  makeReq = ref =>
    reqToFirebase(ref)
      .limitToLast(6)
      .once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        this.setState({ matches: reverseArray(matches) });
      });

  showMatches = () => <div>match</div>;

  render() {
    return (
      <div className="home_matches">
        {this.showMatches(this.state.matches)}
        <div>{}</div>
      </div>
    );
  }
}

export default Blocks;
