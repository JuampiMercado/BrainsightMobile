import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, WebView } from 'react-native';
import Orientation from 'react-native-orientation'
import { StackNavigator } from 'react-navigation';

export default class TestVideo extends React.Component {
  playVideo() {
    this.props.navigation.navigate('VideoPlayerView', { source: { uri: this.props.url }, title: this.props.title });
  }

  render() {
    if (this.props.url.indexOf('.mp4') != -1) {
      return (
        <TouchableOpacity style={styles.button} onPress={() => this.playVideo()}>
          <Text style={styles.text}>Presione para reproducir el video</Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <WebView
          style={styles.video}
          javaScriptEnabled={true}
          source={{ uri: this.props.url }}
        />
      )
    }
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    height: Dimensions.get('window').height * 0.3
  },
  text: {
    textAlign: 'center',
    color: '#FFF',
  },
  video: {
    marginTop: 20,
    width: width,
    height: height * 0.4
  }
})
