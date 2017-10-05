import React from 'react';
import {View,TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import VideoPlayer from 'react-native-video-controls'
import Orientation from 'react-native-orientation'
import { StackNavigator } from 'react-navigation';

export default class TestVideo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      source: this.props.source ,
    }
  }

  playVideo(){
    this.props.navigation.navigate('VideoPlayerView', {source: {uri: this.state.source }} );
  }

  render(){
    return (
        <View>

          <TouchableOpacity style={styles.button} onPress={() => this.playVideo()}>
            <Text style={styles.text}>Presione para reproducir el video</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles= StyleSheet.create({
  button:{
    backgroundColor: '#000',
    height: Dimensions.get('window').height * 0.3
  },
  text:{
    textAlign:'center',
    color:'#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
