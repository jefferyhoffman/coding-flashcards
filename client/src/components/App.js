import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router';
import Loading from './Loading';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import './App.css';

class App extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired
  };

  state = {
    loading: true,
    user: null
  };

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.setState({ loading: false, user });
    });
  }

  render() {
    const routes = (
      <Switch>
        <Route path="/login" render={() => <Login firebase={this.props.firebase} />} />
        <Route path="/dashboard" render={() => this.state.user
          ? <Dashboard firebase={this.props.firebase} />
          : <Redirect to="/login" />
        } />
        <Route component={NotFound} />
      </Switch>
    );

    return (
      <div className="App">
        { this.state.loading
          ? <Loading />
          : routes }
      </div>
    );
  }
}

export default App;
