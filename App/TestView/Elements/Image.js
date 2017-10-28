import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const path = 'https://brainsight-web.herokuapp.com';

export default class TestImage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      source: this.props.contentImage,
    }
  }


  render(){
    return (
        <View>
          <Image source={{uri: path + this.state.source}} style={styles.image}></Image>
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
