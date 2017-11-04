import React, { Component } from 'react'
import { Linking, Platform } from 'react-native'
import { StackNavigator  } from 'react-navigation';
import setupReceiver from '../notificationReceiver';



export default class Receiver extends React.Component {
  componentWillMount() {
    setupReceiver(this.props.getTest);
  }

  render() {
    return null
  }
}
