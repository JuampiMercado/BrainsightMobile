import React, {Component} from 'react';
import {View,ScrollView, StyleSheet, Dimensions,AsyncStorage,TouchableHighlight,Text, ListView } from  'react-native';
import { StackNavigator } from 'react-navigation';
import MainHeader from './MainHeaderNav'
import MainFooter from './MainFooterNav'

const { width, height } = Dimensions.get('window');


export default class Pending extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      testList: [],
      user: this.props.navigation.state.params.user,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    }
    this._getStorageTest();
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Test Pendientes',
    headerLeft: null,
    headerRight: ( <MainHeader navigation={navigation} /> ),
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });



  async _getStorageTest(){
    let keys = await AsyncStorage.getAllKeys();
    let list = [];
    for(var i = 0, len = keys.length; i < len; i++){
      if(keys[i].indexOf('test-') != -1){
        let test = await AsyncStorage.getItem(keys[i]);
        list.push(JSON.parse(test));
      }
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({testsList: list, dataSource: ds.cloneWithRows(list)});
    //this.setState({testList: list});
  }



  _goToTest(id){
    this.props.navigation.state.params._getTest(id);
  }
  render(){
    return(
      <View style={styles.container}>
        <ScrollView style={styles.main}> 
          <View style={styles.titleContainer}>
              <Text style={styles.title}>Los siguientes test no fueron terminados o no han sincronizado sus resultados</Text>
          </View>
          <ListView style={styles.listView}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={(test) => 
              <View style={styles.testContainer} key={test.id}>
                <TouchableHighlight style={styles.testButton}
                  onPress={ () => { this._goToTest(test.id) } }
                  >
                  <Text style={styles.textButton}>{test.name} </Text>
                </TouchableHighlight>
              </View>
            }
          />
        </ScrollView>
        <View style={styles.bottomNav}>
          <MainFooter navigation={this.props.navigation} />
        </View>
      </View>
    );

  }
}


const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainHeader: {
     backgroundColor: '#000000',
  },
  main:{
    marginBottom: 65,
  },
  title:{
    color: '#FFF',
    width: width,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  titleContainer:{
    borderColor: '#000000',
    borderBottomWidth: 1,
    margin: 10
  },
  title:{
    fontWeight: 'bold',
    fontSize: 15
  },
  testContainer:{
     marginLeft: 10,
     marginRight: 10
  },
  testButton:{
    backgroundColor:'#000000',
    paddingVertical: 15,
    marginTop: 15,
    padding: 15,
  },
  textButton:{
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#FFF'
  },
  bottomNav:{
    backgroundColor:'#000000',
    marginTop: 15,
    position: 'absolute',
    bottom:0,
  },
  bottomNav:{
    backgroundColor:'#000000',
    position: 'absolute',
    bottom:0,
    height: 40,
  }
});
