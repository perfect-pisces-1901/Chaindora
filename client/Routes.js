import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import AllSongs from './components/AllSongs';
import { Login, Signup } from './components/AuthForm';
import ArtistUpload from './components/ArtistUpload';
import HomePage from './components/HomePage';
import {me} from './reducers/userReducer';
import {connect} from 'react-redux';
import AudioRecorder from './components/AudioRecorder';

class Routes extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    console.log('user is:', this.props.user)
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={HomePage} />
        <Route path="/songs" component={AllSongs} />
        <Route path="/upload" component={ArtistUpload} />
        <Route path="/record" component={AudioRecorder} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/songs" component={AllSongs} />
            <Route path="/upload" component={ArtistUpload} />
          </Switch>
        )}
        <Redirect to="/login" />
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
