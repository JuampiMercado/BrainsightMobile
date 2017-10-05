import React, {Component,} from 'react';
import { BackHandler} from 'react-native';

export default class BackHandlerAndroid extends React.Component {
    constructor(props)
    {
      super(props);
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }
    render(){return null}
  }
