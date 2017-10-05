import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export default class TestImage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      source: this.props.source,
    }
  }


  render(){
    //var source = require(this.state.source);
    return (
        <View>
          <Image source={{uri: this.state.source}} style={styles.image}></Image>
        </View>
    );
  }
}

const styles= StyleSheet.create({
  image:{
    paddingTop:20,
    height: Dimensions.get('window').height *0.4,
    resizeMode: 'contain',
  }
})
