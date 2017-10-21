import React from 'react';
import { AppRegistry,  } from 'react-native';
import { StackNavigator  } from 'react-navigation';

import HomeScreen from './Root'
import Register from './Home/Register'
import Login from './Home/Login'
import Main from './Main/Main'
import Profile from './Profile/Profile'
import Test from './TestView/Test'
import ScreenManager from './TestView/Screen/ScreenManager'
import StageManager from './TestView/Stage/StageManager'
import VideoPlayerView from './TestView/Elements/VideoPlayerView'
import Orientation from 'react-native-orientation';
import Pending from './Main/Pending'

const Router = StackNavigator({
  Home: { screen: HomeScreen },
  Register: { screen: Register },
  Main: { screen: Main },
  Profile: { screen: Profile },
  Test: { screen: Test, path:'test/:id' },
  StageManager: { screen: StageManager},
  ScreenManager: { screen: ScreenManager},
  VideoPlayerView: { screen: VideoPlayerView},
  Pending: {screen: Pending}
},{initialRouteName: 'Home'});




export default Router;
