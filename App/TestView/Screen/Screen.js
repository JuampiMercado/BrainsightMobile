import React from 'react';
import {View,ScrollView, Text,TextInput, StyleSheet, AsyncStorage } from 'react-native';
import Element from '../Elements/Element'

export default class Screen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      screen: this.props.screen,
    }
  }

  render(){
    var screen = this.state.screen.elements;
    const { navigation, _SaveState } = this.props;
    return (
        <ScrollView style={styles.container}>
            {screen.map(function(element, i){
                return(
                  <View key={'View1-' + i} style={styles.elementContainer} >
                     <Element id={i} type={ element.type } config={element.config}  navigation={navigation} _SaveState={_SaveState}  />
                  </View>
                );
              })
            }
        </ScrollView>

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



