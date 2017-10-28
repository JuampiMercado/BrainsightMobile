import React, { Component } from 'react';
import { Text,View,StyleSheet,TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';

const profileIcon = (<Icon name="dots-three-vertical" size={20} color="#FFFFFF" />);

export default class MainHeaderNav extends React.Component {
  
  onLogoutClick(){
    AsyncStorage.removeItem('user');
    this.props.navigation.navigate('Home');
  }

  _onProfileClick(){
    this.props.navigation.navigate('Profile');
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <TouchableHighlight
          onPress={ () => {navigate('Profile')} }
        >
        {profileIcon}
        </TouchableHighlight>
      </View>
    );

  }
}

const styles= StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFF'
  },
})
