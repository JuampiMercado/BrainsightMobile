import React from 'react';
import { View, AsyncStorage,Platform,Linking } from 'react-native';
import { StackNavigator  } from 'react-navigation';
import Orientation from 'react-native-orientation';
import Login from './Home/Login'


export default class HomeScreen extends React.Component {
  
  componentDidMount() { // B
    this.getUser();
  }

  componentWillMount(){
    Orientation.lockToPortrait();
  }


  async getUser() {
    try {
      var user =await AsyncStorage.getItem('user');
      if (user && user != null && user != undefined){
        this.props.navigation.navigate('Main');
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

