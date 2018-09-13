import React, { Component } from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Admin/Dashboard';

class Routes extends Component {
  render() {
    return (
      <div className="Routes">
        <Layout>
          <Switch>
            <Route exact component={Dashboard} path="/dashboard" />
            <Route exact component={SignIn} path="/sign_in" />
            <Route exact component={Home} path="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default Routes;
