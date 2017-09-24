/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';

import Login from './src/components/Login/Login';

//const Login = require('./src/components/loginView')
const Dashboard = require('./src/components/dashboardView')

export default class Brainsight extends Component {
  render() {
    return (
      <Login />
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('Brainsight', () => Brainsight);
