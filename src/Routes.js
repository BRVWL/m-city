import React, { Component } from 'react';
import Layout from './Hoc/Layout';
import { Switch } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Admin/Dashboard';
import PrivateRoute from './Components/AuthRoutes/PrivateRoute';
import PublicRoute from './Components/AuthRoutes/PublicRoute';
import AdminMatches from './Components/Admin/Matches';
import AddEditMatch from './Components/Admin/Matches/AddEditMatch';
import AdminPlayers from './Components/Admin/Players';
import AddEditPlayer from './Components/Admin/Players/AddEditPlayer';
import TheTeam from './Components/TheTeam';
import TheMatches from './Components/TheMatches';
import NotFound from './Components/404';

class Routes extends Component {
  render() {
    return (
      <div className="Routes">
        <Layout>
          <Switch>
            <PrivateRoute {...this.props} restricted={false} exact component={TheMatches} path="/the_matches" />
            <PrivateRoute {...this.props} restricted={false} exact component={TheTeam} path="/the_team" />
            <PrivateRoute {...this.props} exact component={AddEditPlayer} path="/admin_players/add_player" />
            <PrivateRoute {...this.props} exact component={AddEditPlayer} path="/admin_players/:id" />
            <PrivateRoute {...this.props} exact component={AdminPlayers} path="/admin_players" />
            <PrivateRoute {...this.props} exact component={AddEditMatch} path="/admin_matches/edit_match" />
            <PrivateRoute {...this.props} exact component={AddEditMatch} path="/admin_matches/edit_match/:id" />
            <PrivateRoute {...this.props} exact component={AdminMatches} path="/admin_matches" />
            <PrivateRoute {...this.props} exact component={Dashboard} path="/dashboard" />
            <PublicRoute {...this.props} restricted={true} exact component={SignIn} path="/sign_in" />
            <PublicRoute {...this.props} restricted={false} exact component={Home} path="/" />
            <PublicRoute {...this.props} restricted={false} component={NotFound} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Routes;
