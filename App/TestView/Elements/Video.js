import React from 'react';
import {View,TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Orientation from 'react-native-orientation'
import { StackNavigator } from 'react-navigation';

export default class TestVideo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      source: this.props.source ,
      title: this.props.title
    }
  }

  playVideo(){
    this.props.navigation.navigate('VideoPlayerView', {source: {uri: this.state.source }, title: this.state.title} );
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
  }
})
