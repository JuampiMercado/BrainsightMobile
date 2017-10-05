import React from 'react';
import {View, Text,TextInput, StyleSheet } from 'react-native';
import Question from './Question';
import TestText from './Text';
import TestImage from './Image';
import TestVideo from './Video/Video';
import TestAudio from './Audio'

export default class Element extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      type: this.props.type,
      config: this.props.config,
    }
  }

  render(){
    var element = '';
    debugger;
    switch(this.state.type){
      case 'text':
        element = (<TestText id={this.state.id} {...this.state.config} />);
        break;
      case 'question':
        element = (<Question id={this.state.id} {...this.state.config} />);
        break;
      case 'image':
        element = (<TestImage id={this.state.id} {...this.state.config} />);
        break;
      case 'video':
        element = (<TestVideo id={this.state.id} {...this.state.config} navigation={this.props.navigation} />);
        break;
      case 'audio':
        element = (<TestAudio id={this.state.id} {...this.state.config} />);
        break;
    }

    return (
          <View>{element}</View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  mainHeader: {
     backgroundColor: '#000000',
  },
})
