import React, { Component } from 'react';
import { Text,View,StyleSheet,TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class MainHeaderNav extends React.Component {

  onLogoutClick(){
    AsyncStorage.removeItem('user');
    this.props.navigation.navigate('Home');
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      // <View style={styles.container}>
      //   <TouchableOpacity
      //     style={ styles.touchable}
      //     onPress={() => {navigate('Profile')} }
      //   >
      //     <Text style={ styles.text}>Perfil</Text>
      //   </TouchableOpacity>
      // </View>
      <View style={styles.container}>
        <TouchableHighlight
          onPress={ this.onLogoutClick.bind(this) }
        >
          <Text style={ styles.text}>Cerrar Sesion</Text>
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
