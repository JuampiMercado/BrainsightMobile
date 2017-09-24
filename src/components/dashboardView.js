'use strict'
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'


class dashboardView extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Soy el componente Dashboard</Text>
      </View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title:{
    marginTop:50,
    fontSize:25
  }

})

module.exports = dashboardView;
