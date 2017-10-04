import React from 'react';
import {Image, StyleSheet, Dimensions } from 'react-native';


const alto = Dimensions.get('window').height;

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
        <Image source={{uri: this.state.source}} style={styles.image}></Image>
    );
  }
}

const styles= StyleSheet.create({
  image:{
    paddingTop:20,
    height: alto - 400,
    resizeMode: 'contain',
  }
})
