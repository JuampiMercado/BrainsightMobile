import React, { Component } from 'react';
import { View,StyleSheet, Image,Text,KeyboardAvoidingView,Dimensions,TouchableOpacity } from 'react-native';
import LoginForm from './LoginForm';

const ancho = Dimensions.get('window').width;
const alto = Dimensions.get('window').height;


export default class Login extends React.Component {
  render(){
    const { navigate } = this.props.navigation;
    return(
      <Image
          style={styles.image}
          source={require('../../images/fondoLogin.jpg')}
          >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

          <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../../images/logo.png')}/>
          </View>
          <View style={styles.formContainer}>
            <LoginForm navigation={this.props.navigation}  />

          </View>
      </KeyboardAvoidingView>
      </Image>
    );

  }
}

const styles= StyleSheet.create({
  image:{
    flex: 1,
    width: ancho,
    paddingTop:50,
    opacity: 0.7 //0.8
  },
  container: {
    flex: 1,
    //backgroundColor: '#c6538c',
    width: ancho,
    paddingTop:40
  },
  logoContainer: {
    alignItems:'center',
    flexGrow: 1,
    //justifyContent:'center',
    width: ancho
  },
  logo:{
    width: ancho,
    height:65,
    paddingLeft: 2
  },
  title:{
    color:'#FFF',
    marginTop:10,
    width: ancho,
    textAlign:'center',
    opacity: 0.9,
    fontSize: 50
  },
  formContainer:{
    paddingTop: 10
  }
})



