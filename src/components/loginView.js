'use strict'

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Alert,
  StyleSheet,
  Dimensions
} from 'react-native'

const deviceWidth = Dimensions.get('window').width;

class loginView extends Component{
  render(){
    return(
      <Image
        style={styles.container}
        source={{uri:'https://ak2.picdn.net/shutterstock/videos/4540382/thumb/9.jpg?i10c=img.resize(height:72)'}}
      >
        <View>
          <Text style={styles.title}>BrainSight</Text>
          <TouchableHighlight onPress={(this.onLogin.bind(this))} style={styles.boton}>
            <Text style={styles.textoBoton}>Login</Text>
          </TouchableHighlight>
        </View>


      </Image>
    );
  }

  onLogin(){
    Alert.alert(
      'Acceso',
      'Te has logueado al sistema',
      [
        {
          text:'Aceptar',
          onPress: (this.aceptar.bind(this))
        },
        {
          text:'Cancelar',
          onPress: (this.cancelar.bind(this))
        }

      ]
    )
  }

  aceptar(){
    this.props.navigator.push({
      title: 'Dashboard',
      name: 'Dashboard',
      passProps: {}
    });
  }

  cancelar(){

  }

}
const styles= StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding:30
  },
  boton:{
    width:300,
    height:30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1
  },
  textoBoton:{
    color:'black'
  },
  title:{
    marginTop:100,
    fontSize:30,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontWeight: 'bold'
  }

})

module.exports = loginView;
