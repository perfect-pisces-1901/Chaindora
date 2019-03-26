import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import AllSongs from './components/AllSongs';
import { Login, Signup } from './components/AuthForm';
import ArtistUpload from './components/ArtistUpload';
import ArtistProfile from './components/ArtistProfile';
import HomePage from './components/HomePage';
import {me} from './reducers/userReducer';
import {connect} from 'react-redux';

class Routes extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/user-profile" component={ArtistProfile} />
            <Route path="/songs" component={AllSongs} />
            <Route path="/upload" component={ArtistUpload} />
          </Switch>
        )}
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getUser(){
    dispatch(me())
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes))
