import React from 'react';
import { View, AppRegistry, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Register from './Home/Register'
import Login from './Home/Login'
import Main from './Main/Main'
import Profile from './Profile/Profile'
import Test from './TestView/Test'
import ScreenManager from './TestView/Screen/ScreenManager'
import StageManager from './TestView/Stage/StageManager'
import VideoPlayerView from './TestView/Elements/VideoPlayerView'
import Orientation from 'react-native-orientation';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    Orientation.lockToPortrait()
    this.getUser();
  }


  async getUser() {
    try {
      var user =await AsyncStorage.getItem('user');
      if (user && user != null && user != undefined){
        this.props.navigation.navigate('Main', {user: user} );
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
  StageManager: { screen: StageManager},
  ScreenManager: { screen: ScreenManager},
  VideoPlayerView: { screen: VideoPlayerView}
});

AppRegistry.registerComponent('Brainsight', () => Brainsight);
