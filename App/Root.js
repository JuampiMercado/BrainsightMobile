import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Register from './Home/Register'
import Login from './Home/Login'
import Main from './Main/Main'
import Profile from './Profile/Profile'
import Test from './TestView/Test'
import TestManager from './TestView/TestManager'
import StageManager from './TestView/StageManager'



export default class HomeScreen extends React.Component {
  componentWillMount() {
    this.getUser();
  }

  async getUser() {
    try {
      let user = await AsyncStorage.getItem('User');
      if (!user) {
        console.log("Token not set");
      } else {
        if (user != null && user != undefined){
          this.props.navigation.navigate('Main');
        }
      }
    } catch (error) {
      console.log("Something went wrong");
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
  Test: { screen: Test },
  TestManager: { screen: TestManager},
  StageManager: { screen: StageManager}
});

AppRegistry.registerComponent('Brainsight', () => Brainsight);
