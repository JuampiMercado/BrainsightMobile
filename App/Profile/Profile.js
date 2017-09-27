import React, { Component } from 'react';
import { View,StyleSheet,Text } from 'react-native';

export default class Profile extends React.Component {
  static navigationOptions = () => ({
    title: 'Perfil',
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF'
  });
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text>Modificacion de datos personales!</Text>
      </View>
    );

  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#993366',
    paddingTop:40
  },
  mainHeader: {
     backgroundColor: '#000000',
  },
})

