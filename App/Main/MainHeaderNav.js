import React, { Component } from 'react';
import { Text,View,StyleSheet,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class MainHeaderNav extends React.Component {
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {navigate('Profile')} }
        >
          <Text style={ styles.text}>Perfil</Text>
        </TouchableOpacity>
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
  }
})
