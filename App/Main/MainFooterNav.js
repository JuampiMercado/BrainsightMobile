import React, { Component } from 'react';
import { Text,View,StyleSheet,TouchableHighlight,Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const homeIcon = (<Icon name="home" size={35} color="#000" />);
const pendingIcon = (<Icon name="stack-overflow" size={30} color="#000" />);
const { height, width } = Dimensions.get('window');
export default class MainFooterNav extends React.Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.leftButton}>
          <TouchableHighlight style={{width:width/2, alignItems:'center'}}
            onPress={ () => this.props.navigation.navigate('Main')  }
          >
            {homeIcon}
          </TouchableHighlight>
        </View>
        <View style={styles.rightButton}>
          <TouchableHighlight style={{width:width/2, alignItems:'center'}}
            onPress={ () => this.props.navigation.navigate('Pending', {...this.props, }) }
          >
          {pendingIcon}
          </TouchableHighlight>
        </View>
      </View>
    );

  }
}

const styles= StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#FFF',
    height: 40
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000'
  },
  leftButton:{
    position:'absolute',
    bottom: 0,
    height:40,
    width: width/2,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#000',
    borderTopWidth: 0.5,
    borderTopColor: '#000'
  },
  rightButton:{
     position:'absolute',
    bottom: 0,
    height:40,
    justifyContent:'center',
    width: width/2,
    alignSelf:'flex-end',
    borderTopWidth: 0.5,
    borderTopColor: '#000'
  }
})
