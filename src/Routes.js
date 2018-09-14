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

class Routes extends Component {
  render() {
    return (
      <div className="Routes">
        <Layout>
          <Switch>
            <PrivateRoute {...this.props} exact component={AddEditMatch} path="/admin_matches/edit_match/:id" />
            <PrivateRoute {...this.props} exact component={AdminMatches} path="/admin_matches" />
            <PrivateRoute {...this.props} exact component={Dashboard} path="/dashboard" />
            <PublicRoute {...this.props} restricted={true} exact component={SignIn} path="/sign_in" />
            <PublicRoute {...this.props} restricted={false} exact component={Home} path="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Routes;
