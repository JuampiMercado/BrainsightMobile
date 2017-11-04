import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const path = 'https://brainsight-web.herokuapp.com';

export default class TestImage extends React.Component {
  render() {
    const url = 'http://' + String(this.props.contentImage).substr(2,this.props.contentImage.length);
    return (
      //<Image source={{ uri: path + this.props.contentImage }} style={styles.image}></Image>
      <View>
        <Image source={{ uri: url }} style={styles.image}></Image>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  image: {
    paddingTop: 20,
    height: Dimensions.get('window').height * 0.38,
    borderWidth:1,
    resizeMode: 'contain',
  }
})
