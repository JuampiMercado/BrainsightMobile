import React from 'react';
import {View,TouchableOpacity, Text, StyleSheet, Dimensions,WebView } from 'react-native';
import Orientation from 'react-native-orientation'
import { StackNavigator } from 'react-navigation';

export default class TestVideo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      source: this.props.url ,
      title: this.props.title
    }
  }

  playVideo(){
    this.props.navigation.navigate('VideoPlayerView', {source: {uri: this.state.source }, title: this.state.title} );
  }

  render(){
    if(this.state.source.indexOf('.mp4')!= -1)
    {
      return (
          <View>
            <TouchableOpacity style={styles.button} onPress={() => this.playVideo()}>
              <Text style={styles.text}>Presione para reproducir el video</Text>
            </TouchableOpacity>
          </View>
      );
    }
    else{
      return(
        <WebView
          style={styles.video}
          javaScriptEnabled={true}
          source={{uri: this.state.source}}
        />
        
      )
    }
  }
}

const {height, width} = Dimensions.get('window');

const styles= StyleSheet.create({
  button:{
    backgroundColor: '#000',
    height: Dimensions.get('window').height * 0.3
  },
  text:{
    textAlign:'center',
    color:'#FFF',
  },
  video: {
    marginTop: 20,
    width: width,
    height: height *0.4
  }
})
