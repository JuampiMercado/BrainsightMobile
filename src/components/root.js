'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View
} from 'react-native';
import { StackNavigator } from "react-navigation";



const Root = props =>{
    const { navigate } = props.navigation;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigate("Register")}  style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight  style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 180
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom: 15
  }
});


export default Root
