import React, { Component } from 'react';
import { View,StyleSheet, Image, TextInput, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";
import RailsApi from '../Config';

export default class LoginForm extends React.Component{
  constructor(){
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      showProgress: false,
    }
  }

  storeToken(responseData){
    AsyncStorage.setItem("User", responseData, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  }
  //Fin storeToken
  async onLoginPressed() {
    this.props.;

    this.setState({showProgress: true})
    try {
      let response = await fetch(RailsApi('login'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          }),
        });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let user = res;
          console.log(user);
          //On success we will store the access_token in the AsyncStorage
          this.storeToken(user);
          this.props.navigation.navigate("Main")
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(error) {
        this.setState({error: error});
        console.log("error " + error);
        this.setState({showProgress: false});
    }
  }
  //fin onLoginPressed

  render() {
    const { navigate } = this.props.navigation;
    return(
        <View style={styles.container}>
          <Text style={styles.error}>
            {this.state.error}
          </Text>
          <TextInput
            onChangeText={ (text)=> this.setState({email: text}) }
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
            onChangeText={ (text)=> this.setState({password: text}) }
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            ref={(input) => this.passwordInput = input}
          />
          <TouchableOpacity
            I
            onPress={this.onLoginPressed.bind(this)}
            style={styles.buttonContainer}
            //onPress={() => navigate("Main")}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigate("Register")}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    paddingLeft:20,
    paddingRight:20,
    paddingBottom: 0
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
    marginBottom: 15
  },
  buttonText:{
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight:'700'
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
})




