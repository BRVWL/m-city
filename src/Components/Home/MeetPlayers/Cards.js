import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import PlayerCard from '../../UI/playerCard';

class HomeCards extends Component {
  state = {
    show: this.props.show,
    cards: [
      {
        bottom: 90,
        left: 300
      },
      {
        bottom: 60,
        left: 200
      },
      {
        bottom: 30,
        left: 100
      },
      {
        bottom: 0,
        left: 0
      }
    ]
  };

  showAnimation = () =>
    this.state.cards.map((card, i) => {
      return (
        <Animate
          key={`some${i}`}
          show={this.props.show}
          start={{
            bottom: 0,
            left: 0
          }}
          enter={{
            bottom: [card.bottom],
            left: [card.left],
            timing: {
              duration: 500,
              ease: easePolyOut
            }
          }}>
          {({ left, bottom }) => {
            return (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  left,
                  bottom
                }}>
                <PlayerCard number="30" name="Nicolas" lastName="Otamendi" bck={Otamendi} />
              </div>
            );
          }}
        </Animate>
      );
    });

  render() {
    return <div>{this.showAnimation()}</div>;
  }
}

export default HomeCards;
