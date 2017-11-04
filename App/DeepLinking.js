import React, { Component } from 'react'
import { Linking, Platform } from 'react-native'
import { StackNavigator  } from 'react-navigation';



export default class DeepLinking extends React.Component {
  constructor(props){
    super(props)
    this._handleChange.bind(this);
  }

  async componentWillMount() {
    Linking.addEventListener('url', this._handleChange)
    const url = await Linking.getInitialURL()
    if (url){
      this.push(url)
    }

  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleChange)
  }

  _handleChange = (e) => {
    this.push(e.url)
  }

  push = (url) => {
    if(url && url != undefined){
      var scheme = 'http://';
      if(url.indexOf('https') != -1)
        scheme = 'https://';
      const sRepl = scheme + prefix;
      var pathname = url.replace(sRepl, '');
      this.props.linkToTest(pathname);
    }
  }

  render() {
    return null
  }
}

const prefix = Platform.OS == 'android' ? 'brainsight-web.herokuapp.com/test/' : 'https://';



