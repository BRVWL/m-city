import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import AdminLayout from '../../../Hoc/AdminLayout';
import { reqToFirebase } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../Components/UI/misc';

class AdminPlayers extends Component {
  state = {
    isLoading: true,
    players: []
  };

  componentDidMount() {
    reqToFirebase('players')
      .once('value')
      .then(res => {
        this.setState({
          isLoading: false,
          players: reverseArray(firebaseLooper(res))
        });
      });
  }

  render() {
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.players
                  ? this.state.players.map((player, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Link to={`/admin_players/${player.id}`}>{player.name}</Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin_players/${player.id}`}>{player.lastname}</Link>
                        </TableCell>
                        <TableCell>{player.number}</TableCell>
                        <TableCell>{player.position}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {this.state.isLoading && <CircularProgress thickness={6} style={{ color: '#98c5e9' }} />}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;
