import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store/store';
import HomeScreen from './screens/home.screen';
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
