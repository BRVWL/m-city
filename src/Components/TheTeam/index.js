import React, { Component } from 'react';
import PlayerCard from '../UI/playerCard';
import Fade from 'react-reveal/Fade';
import stripes from '../../Resources/images/stripes.png';
import { reqToFirebase, firebase } from '../../firebase';
import { firebaseLooper } from '../UI/misc';
import { Promise } from 'core-js';

class TheTeam extends Component {
  state = {
    loading: true,
    players: []
  };

  componentDidMount() {
    reqToFirebase('players')
      .once('value')
      .then(res => {
        const players = firebaseLooper(res);
        // For getting all images from server
        let promises = [];
        for (let key in players) {
          promises.push(
            new Promise((resolve, reject) => {
              firebase
                .storage()
                .ref('players')
                .child(players[key].image)
                .getDownloadURL()
                .then(url => {
                  players[key].url = url;
                  resolve();
                });
            })
          );
        }
        Promise.all(promises).then(() => {
          this.setState({
            loading: false,
            players
          });
        });
      });
  }

  render() {
    console.log(this.state.players);
    return (
      <div>
        <div>The team</div>
      </div>
    );
  }
}

export default TheTeam;
