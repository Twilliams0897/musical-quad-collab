import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { LoginScreen } from './screens/login.screen';
import { MyScreen } from './screens/my.screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store/store';
import RouterComponent from './router/router.component';

export default function App() {
	const Stack = createStackNavigator();

	return (
		<Provider store={store}>
			<NavigationContainer>
				<RouterComponent></RouterComponent>
			</NavigationContainer>
		</Provider>
	);
}
