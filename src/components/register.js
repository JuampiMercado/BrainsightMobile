import React, { Component } from 'react';
import { View,StyleSheet, Text, TextInput, TouchableHighlight } from 'react-native';



class Register extends Component{
  constructor(props){
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation:"",
      errors: []
    }

  }
  render(){
    return(
          <View style={styles.container}>
            <TextInput
              onChangeText={ (text)=> this.setState({email: text}) }
              style={styles.input} placeholder="Email">
            </TextInput>
            <Text>
              {this.state.email}
            </Text>
          </View>
    );

  }
}

const styles= StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding:10,
    paddingTop:80
  },
  input: {

  }
})


export default Register

