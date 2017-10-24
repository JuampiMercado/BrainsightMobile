import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { StackNavigator  } from 'react-navigation';
import Orientation from 'react-native-orientation';
import Login from './Login'


export default class Home extends React.Component {

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



