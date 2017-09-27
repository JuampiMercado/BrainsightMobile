import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Register from './Home/Register'
import Login from './Home/Login'
import Main from './Main/Main'
import Profile from './Profile/Profile'


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return(
      <Login navigation={this.props.navigation} />
    );
  }
}

export const Brainsight = StackNavigator({
  Home: { screen: HomeScreen },
  Register: { screen: Register },
  Main : { screen: Main, navigation: HomeScreen.navigate },
  Profile: { screen: Profile },
});

AppRegistry.registerComponent('Brainsight', () => Brainsight);
