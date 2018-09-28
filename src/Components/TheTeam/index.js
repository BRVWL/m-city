import React, { Component } from 'react';
import PlayerCard from '../UI/playerCard';
import Fade from 'react-reveal/Fade';
import stripes from '../../Resources/images/stripes.png';
import { reqToFirebase, firebase } from '../../firebase';
import { firebaseLooper } from '../UI/misc';
import { Promise } from 'core-js';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  showPlayersByCategory = category =>
    this.state.players
      ? this.state.players.map((player, i) => {
          return player.position === category ? (
            <Fade left key={i} delay={i * 20}>
              <div className="item">
                <PlayerCard number={player.number} name={player.name} lastname={player.lastname} bck={player.url} />
              </div>
            </Fade>
          ) : null;
        })
      : null;

  render() {
    return (
      <div className="the_team_container" style={{ background: `url(${stripes}) repeat` }}>
        {!this.state.loading ? (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="teem_cards">{this.showPlayersByCategory('Keeper')}</div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Defence</div>
              <div className="teem_cards">{this.showPlayersByCategory('Defence')}</div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Midfield</div>
              <div className="teem_cards">{this.showPlayersByCategory('Midfield')}</div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Strikers</div>
              <div className="teem_cards">{this.showPlayersByCategory('Striker')}</div>
            </div>
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              margin: '30px'
            }}>
            <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
          </div>
        )}
      </div>
    );
  }
}

export default TheTeam;
