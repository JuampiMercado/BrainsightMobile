import React from 'react';
import {View, Text,TextInput, StyleSheet, AsyncStorage } from 'react-native';
import RailsApi from '../Config';
import Element from './Elements/Element'

export default class Screen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      screen: this.props.screen,
    }
  }

  render(){
    var screen = this.state.screen.elements;
    const { navigation } = this.props;
    return (
        <View style={styles.container}>
            {screen.map(function(element, i){
                return(
                  <View key={'View1-' + i} style={styles.elementContainer} >
                    <Element id={i} type={ element.type } config={element.config}  navigation={navigation} />
                  </View>
                );
              })
            }
        </View>

    );
  }
}



const styles= StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  mainHeader: {
     backgroundColor: '#000000',
  },
  elementContainer:{
    marginBottom: 40
  }
})



