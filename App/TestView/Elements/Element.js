import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Question from './Question';
import TestText from './Text';
import TestImage from './Image';
import TestVideo from './Video';
import TestAudio from './Audio'

export default class Element extends React.Component {
  render() {
    var element = '';
    switch (this.props.type) {
      case 'RTETitle'://Title y Paragraph
        element = (<TestText id={this.props.id} {...this.props.config} />);
        break;
      case 'Question':
        element = (<Question id={this.props.id} {...this.props.config} _SaveState={this.props._SaveState} />);
        break;
      case 'MediaContent':
        element = (<TestImage id={this.props.id} {...this.props.config} />);
        break;
      case 'Embed':
        element = (<TestVideo id={this.props.id} {...this.props.config} navigation={this.props.navigation} />);
        break;
      default:
        element = (<Text></Text>);
        break;
    }

    return (
      <View>{element}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  mainHeader: {
    backgroundColor: '#000000',
  },
})
