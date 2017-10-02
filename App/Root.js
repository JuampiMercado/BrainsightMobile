import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Register from './Home/Register'
import Login from './Home/Login'
import Main from './Main/Main'
import Profile from './Profile/Profile'




export default class HomeScreen extends React.Component {
  componentWillMount() {
    this.getToken();
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem('User');
      if (!accessToken) {
        console.log("Token not set");
      } else {
        this.verifyToken(accessToken)
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  async verifyToken(token) {
    let accessToken = token
    if (accessToken != null && accessToken != undefined){
      this.props.navigation.navigate('Main');
    }
  }

  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Login navigation={this.props.navigation} />
    );
  }
}

export const Brainsight = StackNavigator({
  Home: { screen: HomeScreen },
  Register: { screen: Register },
  Main: { screen: Main, navigation: HomeScreen.navigate },
  Profile: { screen: Profile },
});

AppRegistry.registerComponent('Brainsight', () => Brainsight);
