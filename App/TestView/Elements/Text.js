import React from 'react';
import { View, Text } from 'react-native';

export default class TestText extends React.Component {
  render() {
    var styles = {
      fontSize: this.props.size,
      color: this.props.color
    }
    return (
      <Text key={'Text-' + this.props.id} style={styles}>{this.props.text}</Text>
    );
  }
}
