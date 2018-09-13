import React, { Component } from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Admin/Dashboard';
import PrivateRoute from './Components/AuthRoutes/PrivateRoute';

class Routes extends Component {
  render() {
    console.log('Routes props', this.props);
    return (
      <div className="Routes">
        <Layout>
          <Switch>
            <PrivateRoute {...this.props} exact component={Dashboard} path="/dashboard" />
            <Route exact component={SignIn} path="/sign_in" />
            <Route exact component={Home} path="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Routes;
