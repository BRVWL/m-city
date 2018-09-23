import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebase, reqToFirebase } from '../../firebase';
import { firebaseLooper, reverseArray } from '../UI/misc';
import MatchesList from './MatchesList';

class TheMatches extends Component {
  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playerFilter: 'All',
    resultFilter: 'All'
  };

  componentDidMount() {
    reqToFirebase('matches')
      .once('value')
      .then(res => {
        this.setState({
          loading: false,
          matches: reverseArray(firebaseLooper(res)),
          filterMatches: reverseArray(firebaseLooper(res))
        });
      });
  }

  render() {
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">{}</div>
            <MatchesList matches={this.state.filterMatches} />
          </div>
        </div>
      </div>
    );
  }
}

export default TheMatches;
