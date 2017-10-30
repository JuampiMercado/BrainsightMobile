import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const path = 'https://brainsight-web.herokuapp.com';

export default class TestImage extends React.Component {
  render() {
    return (
      <Image source={{ uri: path + this.props.contentImage }} style={styles.image}></Image>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    paddingTop: 20,
    height: Dimensions.get('window').height * 0.4,
    resizeMode: 'contain',
  }
})
