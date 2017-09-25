/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Navigator} from 'react-native';

import Login from './src/components/Login/Login';
import Register from './src/components/register';
import Root from './src/components/root';

/*const App = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
});*/

export default class Brainsight extends Component {

  renderScene(route, navigator) {
    console.log(route);
    if(route.name == 'root') {
      return <Root navigator={navigator} />
    }
    if(route.name == 'register') {
      return <Register navigator={navigator} />
    }
    if(route.name == 'login') {
      return <Login navigator={navigator} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StackNavigator
          initialRoute={{name: 'root'}}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Brainsight', () => Brainsight);
