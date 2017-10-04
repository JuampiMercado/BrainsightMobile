import React from 'react';
import { View, Text,TouchableOpacity,StyleSheet, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RailsApi from '../Config';



export default class Test extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      test: this.props.navigation.state.params.test,
      user: this.props.navigation.state.params.user
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.testButton}
          onPress={ () => { navigate('StageManager',{ stages: this.state.test.data, currentStage: 0}) } }
          >
          <Text style={styles.textButton}>¡Empezar! </Text>
        </TouchableOpacity>
      </View>
      );
  }
}


const styles= StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,

  },
  mainHeader: {
     backgroundColor: '#000000',
  },
  testButton:{
    backgroundColor:'#000000',
    paddingVertical: 15,
    marginTop: 15,
    padding: 15,
  },
  textButton:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF'
  },
})
