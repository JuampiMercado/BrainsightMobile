/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from "react-navigation";
import Login from "./src/components/Login/Login";
import Register from "./src/components/register";



const Brainsight = props => {
  return <Login navigation={props.navigation} />;
};

const BrainsightNav = StackNavigator({
  Login: {screen: Login },
  Register: { screen: Register },
});

Brainsight.navigationOptions = {
  title: "Home"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Brainsight', () => BrainsightNav);
