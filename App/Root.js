import React from 'react';
import { View, Image, AsyncStorage, StyleSheet, Dimensions } from 'react-native';
import { StackNavigator  } from 'react-navigation';
import Orientation from 'react-native-orientation';

export default class Root extends React.Component {

  componentDidMount() {
    this.getUser();
  }

  componentWillMount(){
    Orientation.lockToPortrait();
  }


  async getUser() {
    try {
      var user =await AsyncStorage.getItem('user');
      if (user && user != null && user != undefined){
        this.props.navigation.navigate('Main');
      }
      else{
        this.props.navigation.navigate('Home');
      }
    } catch (error) {
      console.log("[getUser|Root]: " + error);
    }

  }

  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Image
          style={styles.image}
          source={require('../images/fondoLogin.jpg')}
          >
          <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../images/logo.png')}/>
          </View>
        </Image>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles= StyleSheet.create({
  image:{
    flex: 1,
    width: width,
    paddingTop:50,
    opacity: 0.7 //0.8
  },
  logoContainer: {
    flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
  },
  logo:{
    width: width,
    height:65,
    paddingLeft: 2
  },
});

