import React, { Component } from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Admin/Dashboard';
import PrivateRoute from './Components/AuthRoutes/PrivateRoute';
import PublicRoute from './Components/AuthRoutes/PublicRoute';
import AdminMatches from './Components/Admin/Matches';

class Routes extends Component {
  render() {
    console.log('Routes props', this.props);
    return (
      <div className="Routes">
        <Layout>
          <Switch>
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
