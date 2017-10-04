import React from 'react';
import {View, Text } from 'react-native';

export default class TestText extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      text: this.props.text,
      size: this.props.size,
      color: this.props.color
    }
  }

  render(){
    var styles = {
      fontSize: this.state.size,
      color: this.state.color
    }
    return (
        <View>
          <Text key={'Text-' + this.state.id} style={styles} >{this.state.text}</Text>
        </View>

    );
  }
}
