import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store/store';
import RouterComponent from './router/router.component';


export default function App() {
	const Stack = createStackNavigator();
	console.log(store, 'store');
	return (
		<Provider store={store}>
			<NavigationContainer>
				<RouterComponent></RouterComponent>
			</NavigationContainer>
		</Provider>
	);
}
