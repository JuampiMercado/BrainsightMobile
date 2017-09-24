import React, { Component } from 'react';
import { View,StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native';


export default class LoginForm extends Component{
  render(){
    return(
        <View style={styles.container}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}

          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            ref={(input) => this.passwordInput = input}
          />
          <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    padding:20
  },
  input:{
    height:40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer:{
    backgroundColor:'#993366',
    paddingVertical: 15,
    paddingTop: 15
  },
  buttonText:{
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight:'700'
  }
})


