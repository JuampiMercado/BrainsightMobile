/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StatusBar,
	View
} from 'react-native';

console.disableYellowBox = true;
//import App from './App/App';
//import DeepLinking from './App/DeepLinking';
import Router from './App/Router'

// export default class BrainsightMobile extends Component {
// 	render() {
// 		return (
//         <View>
// 					<DeepLinking/>
// 					<App/>
// 					<StatusBar barStyle="light-content"/>
// 				</View>

// 		);
// 	}
// }

AppRegistry.registerComponent('Brainsight', () => Router);
