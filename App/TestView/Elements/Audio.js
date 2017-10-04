import React from 'react';
import {StyleSheet } from 'react-native';

export default class TestAudio extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      source: this.props.source,
    }
  }

  render(){
    return (
        null
    );
  }
}

const styles= StyleSheet.create({

})
